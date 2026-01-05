# backend/users/urls.py
from django.urls import path, include
from .views import CreateUserView, CustomTokenObtainPairView, google_callback
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("register/", CreateUserView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/", include("allauth.socialaccount.providers.google.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "auth/google/callback/success/",
        views.google_callback,
        name="google_auth_success",
    ),
    path("user-info/", views.get_user_info, name="user-info"),
]
