from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.models.groups_models import GroupMembership
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
        print("DEBUG: User not authenticated in callback. Redirecting to frontend login with error.")
        return redirect(f"{settings.FRONTEND_BASE_URL}/login?error=auth_failed")

    user = request.user  # already authenticated by allauth

    refresh = RefreshToken.for_user(user)
    print(f"DEBUG: Generated tokens for user {user.username}")

    frontend_callback = f"{settings.FRONTEND_BASE_URL}/auth/callback"

    return redirect(
        f"{frontend_callback}"
        f"?access={str(refresh.access_token)}"
        f"&refresh={str(refresh)}"
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Returns information about the currently authenticated user.
    Requires a valid Token or JWT in the Authorization header.
    """
    user = request.user

    # Check leadership status directly using the setting
    # This replaces the manual 'has_permission' call
    is_leadership = GroupMembership.objects.filter(
        user=user.id, 
        group_id=settings.LEADERSHIP_GROUP_ID
    ).exists()

    data = {
        "username": user.username,
        "email": user.email,
        "phone_number": getattr(user, 'phone_number', None), # Safely get if field exists
        "is_approved_member": getattr(user, 'is_approved_member', False),
        "is_global_auditor": getattr(user, 'is_global_auditor', False),
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        "is_leadership": is_leadership
    }

    return Response(data)