# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Add any new fields to the fieldsets and list_display
    model = CustomUser
    list_display = ["id", "username", "phone_number", "is_approved_member", "is_global_auditor"]
    
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number', 'is_approved_member', 'is_global_auditor')}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number', 'is_approved_member', 'is_global_auditor')}),
    )

admin.site.register(CustomUser, CustomUserAdmin) 