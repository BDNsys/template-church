from rest_framework import viewsets, permissions
from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models.members_models import Member, MembershipRequest
from rest_framework.decorators import action
from rest_framework.response import Response

from api.serializers.member_serializers import (
    MemberSerializer,
    MembershipRequestSerializer,
)
from api.permissions import IsSuperuser

User = get_user_model()


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or getattr(user, "is_global_auditor", False):
            return Member.objects.all()
        if getattr(user, "is_approved_member", False):
            return Member.objects.all()
        return Member.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MembershipRequestViewSet(viewsets.ModelViewSet):
    queryset = MembershipRequest.objects.all()
    serializer_class = MembershipRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status="PENDING")

    @action(detail=True, methods=["post"], permission_classes=[IsSuperuser])
    def approve(self, request, pk=None):
        req = self.get_object()
        req.status = "APPROVED"
        req.save()

        user = req.user
        user.is_approved_member = True
        user.save()

        Member.objects.get_or_create(
            user=user,
            defaults={
                "first_name": req.full_name.split(" ")[0],
                "last_name": " ".join(req.full_name.split(" ")[1:]),
                "phone_number": req.phone_to_sync or user.phone_number or "",
            },
        )

        return Response({"status": "approved"})
