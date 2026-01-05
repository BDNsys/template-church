from django.conf import settings
from rest_framework import serializers

from django.contrib.auth import get_user_model
from api.models.groups_models import GroupMembership
from api.permissions import IsGroupMaker, IsGroupAuditor, IsGroupMember


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "phone_number",
            "is_approved_member",
            "is_global_auditor",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.models.groups_models import GroupMembership


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # ✅ Custom claims
        token["username"] = user.username
        token["email"] = user.email
        token["phone_number"] = user.phone_number
        token["is_approved_member"] = user.is_approved_member
        token["is_global_auditor"] = user.is_global_auditor
        token["is_staff"] = user.is_staff
        token["is_superuser"] = user.is_superuser

        # Add group memberships

        return token
