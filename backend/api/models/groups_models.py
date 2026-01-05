from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# 2. Group & Dynamic Roles
class ChurchGroup(models.Model):
    GROUP_TYPES = (
        ('LEADERSHIP', 'Leadership'), 
        ('FINANCE', 'Finance'), 
        ('GENERAL', 'General (Choir/Youth/etc)'),
        ('TECH', 'Tech Team')
    )
    name = models.CharField(max_length=100)
    group_type = models.CharField(choices=GROUP_TYPES, max_length=20)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    can_manage_blog = models.BooleanField(default=False)
    can_manage_gallery = models.BooleanField(default=False)
    can_manage_finances = models.BooleanField(default=False)

class GroupMembership(models.Model):
    ROLE_CHOICES = (
        ('MAKER', 'Maker/Register'),     # Can create/post
        ('APPROVER', 'Approver'),        # Specific to Finance
        ('AUDITOR', 'Auditor/Deleter'), # Can delete/audit
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(ChurchGroup, on_delete=models.CASCADE)
    role = models.CharField(choices=ROLE_CHOICES, max_length=20)

    class Meta:
        unique_together = ('user', 'group')