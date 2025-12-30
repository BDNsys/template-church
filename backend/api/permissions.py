from rest_framework import permissions
from .models.groups_models import GroupMembership, ChurchGroup

# 1. Global System Roles
class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

class IsGlobalAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_superuser or getattr(request.user, 'is_global_auditor', False))

class IsApprovedMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and getattr(request.user, 'is_approved_member', False)

# 2. Group-Specific Roles
class IsGroupMember(permissions.BasePermission):
    """
    Allows access if the user is a member of the group.
    Assumes `group_pk` or `pk` (if view is for group) is available in view.kwargs.
    """
    def has_permission(self, request, view):
        # This is a bit tricky for list views unless we filter querysets.
        # For object permission:
        return True

    def has_object_permission(self, request, view, obj):
        # If obj is ChurchGroup
        if isinstance(obj, ChurchGroup):
            return GroupMembership.objects.filter(user=request.user, group=obj).exists()
        # If obj is related to a group (e.g. Post), implement logic to fetch group from obj
        return False

class IsGroupMaker(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, ChurchGroup):
            return GroupMembership.objects.filter(
                user=request.user, 
                group=obj, 
                role__in=['MAKER', 'LEADER'] # Assuming Leader is Maker
            ).exists()
        return False

class IsGroupAuditor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, ChurchGroup):
            return GroupMembership.objects.filter(
                user=request.user, 
                group=obj, 
                role='AUDITOR'
            ).exists()
        return False

# 3. Specialized Group Roles (Finance)
class IsFinanceMaker(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if user is in Finance group with Maker role
        return GroupMembership.objects.filter(
            user=request.user,
            group__group_type='FINANCE',
            role='MAKER'
        ).exists()

class IsFinanceApprover(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user,
            group__group_type='FINANCE',
            role='APPROVER'
        ).exists()

class IsFinanceAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user,
            group__group_type='FINANCE',
            role='AUDITOR'
        ).exists()

# 4. Specialized Group Roles (Tech)
class IsTechMaker(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user,
            group__group_type='TECH',
            role='MAKER'
        ).exists()

class IsTechAuditor(permissions.BasePermission):
    def has_permission(self, request, view):
        return GroupMembership.objects.filter(
            user=request.user,
            group__group_type='TECH',
            role='AUDITOR'
        ).exists()
