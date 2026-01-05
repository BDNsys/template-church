from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models.groups_models import ChurchGroup, GroupMembership
from api.permissions import IsTechMaker, IsTechAuditor
from rest_framework.test import APIRequestFactory
from rest_framework.request import Request
from unittest.mock import Mock

User = get_user_model()


class TechGroupPermissionTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="techuser", password="password")
        self.tech_group = ChurchGroup.objects.create(
            name="Tech Team", group_type="TECH"
        )
        self.factory = APIRequestFactory()

    def test_tech_maker_permission(self):
        # Assign MAKER role
        GroupMembership.objects.create(
            user=self.user, group=self.tech_group, role="MAKER"
        )

        request = self.factory.get("/")
        request.user = self.user

        permission = IsTechMaker()
        self.assertTrue(permission.has_permission(request, None))

        # Should not be auditor
        permission_auditor = IsTechAuditor()
        self.assertFalse(permission_auditor.has_permission(request, None))

    def test_tech_auditor_permission(self):
        # Assign AUDITOR role
        GroupMembership.objects.create(
            user=self.user, group=self.tech_group, role="AUDITOR"
        )

        request = self.factory.get("/")
        request.user = self.user

        permission = IsTechAuditor()
        self.assertTrue(permission.has_permission(request, None))

        # Should not be maker
        permission_maker = IsTechMaker()
        self.assertFalse(permission_maker.has_permission(request, None))
