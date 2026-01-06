from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.models.groups_models import GroupMembership, ChurchGroup

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
