from rest_framework import generics, status
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models.groups_models import GroupMembership, ChurchGroup
import requests

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken
class GoogleLogin(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def _unique_username(email: str) -> str:
        base = slugify(email.split("@")[0]) or "google-user"
        username = base
        index = 1
        while User.objects.filter(username=username).exists():
            index += 1
            username = f"{base}-{index}"
        return username

    def post(self, request, *args, **kwargs):
        code = request.data.get("code")
        code_verifier = request.data.get("code_verifier")
        redirect_uri = request.data.get("redirect_uri") or settings.GOOGLE_REDIRECT_URI

        if not code or not code_verifier:
            return Response(
                {"detail": "Both 'code' and 'code_verifier' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token_payload = {
            "code": code,
            "client_id": settings.SOCIAL_AUTH_GOOGLE_CLIENT_ID,
            "client_secret": settings.SOCIAL_AUTH_GOOGLE_CLIENT_SECRET,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
            "code_verifier": code_verifier,
        }

        try:
            token_response = requests.post(
                "https://oauth2.googleapis.com/token",
                data=token_payload,
                timeout=10,
            )
            token_response.raise_for_status()
            google_tokens = token_response.json()
        except requests.RequestException:
            return Response(
                {"detail": "Failed to exchange authorization code with Google."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        id_token = google_tokens.get("id_token")
        if not id_token:
            return Response(
                {"detail": "Google response did not include id_token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token_info_response = requests.get(
                "https://oauth2.googleapis.com/tokeninfo",
                params={"id_token": id_token},
                timeout=10,
            )
            token_info_response.raise_for_status()
            token_info = token_info_response.json()
        except requests.RequestException:
            return Response(
                {"detail": "Failed to validate id_token with Google."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if token_info.get("aud") != settings.SOCIAL_AUTH_GOOGLE_CLIENT_ID:
            return Response(
                {"detail": "Invalid Google token audience."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = token_info.get("email")
        if not email:
            return Response(
                {"detail": "Google account email is missing."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.filter(email=email).first()
        if not user:
            user = User.objects.create(
                username=self._unique_username(email),
                email=email,
                first_name=token_info.get("given_name", ""),
                last_name=token_info.get("family_name", ""),
            )
            user.set_unusable_password()
            user.save()

        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_200_OK,
        )


def google_callback(request):
    print(f"DEBUG: google_callback reached. User: {request.user}")
    print(f"DEBUG: User is authenticated: {request.user.is_authenticated}")

    if not request.user.is_authenticated:
        print(
            "DEBUG: User not authenticated in callback. Redirecting to frontend login with error."
        )
        return redirect(f"{settings.FRONTEND_BASE_URL}/login?error=auth_failed")

    user = request.user  # already authenticated by allauth

    refresh = RefreshToken.for_user(user)
    print(f"DEBUG: Generated tokens for user {user.username}")

    frontend_callback = f"{settings.FRONTEND_BASE_URL}/auth/callback"

    return redirect(
        f"{frontend_callback}?access={str(refresh.access_token)}&refresh={str(refresh)}"
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Returns information about the currently authenticated user.
    Requires a valid Token or JWT in the Authorization header.
    """
    user = request.user

    try:
        # Check leadership status directly using the setting
        is_leadership = GroupMembership.objects.filter(
            user=user, group_id=settings.LEADERSHIP_GROUP_ID
        ).exists()

        # Initialize finance-related variables
        is_finance_member = False
        is_finance_maker = False
        is_finance_approver = False
        is_finance_auditor = False

        try:
            finance_group = ChurchGroup.objects.get(group_type="FINANCE")
            finance_member = GroupMembership.objects.filter(
                user=user, group=finance_group
            )
            is_finance_member = finance_member.exists()
            is_finance_maker = finance_member.filter(role="MAKER").exists()
            is_finance_approver = finance_member.filter(role="APPROVER").exists()
            is_finance_auditor = finance_member.filter(role="AUDITOR").exists()
        except ChurchGroup.DoesNotExist:
            pass  # Finance group doesn't exist, keep defaults as False

        permissions = {
            "can_manage_blog": [],
            "can_manage_gallery": [],
            "can_manage_videos": [],
        }

        groups = {}
        users_groups = GroupMembership.objects.filter(user=user)

        for membership in users_groups:
            if membership.can_manage_blog:
                permissions["can_manage_blog"].append(membership.group.name)
            if membership.can_manage_gallery:
                permissions["can_manage_gallery"].append(membership.group.name)
            if membership.can_manage_videos:
                permissions["can_manage_videos"].append(membership.group.name)

            groups[membership.group.name] = {
                "id": membership.group.id,
                "name": membership.group.name,
                "role": membership.role,
            }

        data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone_number": getattr(user, "phone_number", None),
            "is_approved_member": getattr(user, "is_approved_member", False),
            "is_global_auditor": getattr(user, "is_global_auditor", False),
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "is_leadership": is_leadership,
            "is_finance_member": is_finance_member,
            "is_finance_maker": is_finance_maker,
            "is_finance_approver": is_finance_approver,
            "is_finance_auditor": is_finance_auditor,
            "groups": groups,
            "permissions": permissions,
        }

        return Response(data)  # ✅ Return Response object with data

    except Exception as e:
        # Log the error for debugging
        print(f"Error in get_user_info: {str(e)}")
        # Return a proper error response
        return Response(
            {"error": "An error occurred while fetching user information"}, status=500
        )
