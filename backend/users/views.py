from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

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
        return redirect("http://localhost:8000/login?error=auth_failed")

    user = request.user  # already authenticated by allauth

    refresh = RefreshToken.for_user(user)
    print(f"DEBUG: Generated tokens for user {user.username}")

    frontend_callback = "http://localhost:8000/auth/callback"

    return redirect(
        f"{frontend_callback}"
        f"?access={str(refresh.access_token)}"
        f"&refresh={str(refresh)}"
    )