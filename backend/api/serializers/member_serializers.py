from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models.members_models import Member, MembershipRequest

User = get_user_model()


class MemberSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = "__all__"
        read_only_fields = (
            "user",
            "membership_status",
            "joined_date",
            "created_at",
            "updated_at",
        )

    def get_user_details(self, obj):
        if obj.user:
            return {
                "username": obj.user.username,
                "email": obj.user.email,
                "phone": obj.user.phone_number,
            }
        return None


class MembershipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipRequest
        fields = "__all__"
        read_only_fields = ("user", "status", "submitted_at")
