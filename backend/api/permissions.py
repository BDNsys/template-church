from rest_framework import permissions
from .models.groups_models import GroupMembership, ChurchGroup


# 1. Global System Roles
class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class IsGlobalAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (
            request.user.is_superuser
            or getattr(request.user, "is_global_auditor", False)
        )


class IsApprovedMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "is_approved_member", False)
        )


# 2. Group-Specific Roles
class IsGroupMember(permissions.BasePermission):
    """
    Checks if the user belongs to a group ID provided in the request body.
    """

    def has_permission(self, request, view):
        # 1. Look for 'group' or 'group_id' in the POST/PUT body
        group_id = request.data.get("group_id")

        # 2. If it's not in the body, maybe check the URL as a fallback?

        if not group_id:
            return False

        # 3. Perform the membership check
        return GroupMembership.objects.filter(
            user=request.user, group_id=group_id
        ).exists()


class IsGroupMaker(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, ChurchGroup):
            return GroupMembership.objects.filter(
                user=request.user,
                group=obj,
                role__in=["MAKER", "LEADER"],  # Assuming Leader is Maker
            ).exists()
        return False


class IsGroupAuditor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, ChurchGroup):
            return GroupMembership.objects.filter(
                user=request.user, group=obj, role="AUDITOR"
            ).exists()
        return False


# 3. Specialized Group Roles (Finance)
class IsFinanceMaker(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if user is in Finance group with Maker role
        return GroupMembership.objects.filter(
            user=request.user, group__group_type="FINANCE", role="MAKER"
        ).exists()


class IsFinanceApprover(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user, group__group_type="FINANCE", role="APPROVER"
        ).exists()


class IsFinanceAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user, group__group_type="FINANCE", role="AUDITOR"
        ).exists()


# 4. Specialized Group Roles (Tech)
class IsTechMaker(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user, group__group_type="TECH", role="MAKER"
        ).exists()


class IsTechAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user, group__group_type="TECH", role="AUDITOR"
        ).exists()
