from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model
User = get_user_model()

class Member(models.Model):
    # 1. CORE LINKAGE
    # Null=True allows a Member record to exist before a User account is created (for the Sync feature)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name="member_profile"
    )

    # 2. PERSONAL IDENTIFICATION
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female')], blank=True)
    
    # 3. CONTACT INFO (Critical for your Sync Logic)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Format: '+999999999'.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    address = models.TextField(blank=True)

    # 4. CHURCH MILESTONES
    membership_status = models.CharField(
        max_length=20, 
        choices=[
            ('PENDING', 'Pending Approval'),
            ('ACTIVE', 'Active Member'),
            ('INACTIVE', 'Inactive'),
            ('VISITOR', 'Frequent Visitor')
        ],
        default='PENDING'
    )
    baptism_date = models.DateField(null=True, blank=True)
    joined_date = models.DateField(auto_now_add=True)
    
    # 5. FAMILY/RELATIONSHIP (Optional but helpful)
    marital_status = models.CharField(
        max_length=20, 
        choices=[('S', 'Single'), ('M', 'Married'), ('D', 'Divorced'), ('W', 'Widowed')],
        blank=True
    )

    # 6. THE "FLEXIBILITY" FIELD
    # This allows you to store any extra info (talents, allergies, hobbies) 
    # without changing the database schema later.
    extra_data = models.JSONField(default=dict, blank=True)

    # 7. METADATA
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.phone_number})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class MembershipRequest(models.Model):
    REQUEST_TYPES = (('NEW', 'New Member'), ('SYNC', 'Sync Existing'))
    STATUS = (('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('REJECTED', 'Rejected'))
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request_type = models.CharField(choices=REQUEST_TYPES, max_length=10)
    full_name = models.CharField(max_length=255)
    phone_to_sync = models.CharField(max_length=15, null=True, blank=True)
    status = models.CharField(choices=STATUS, default='PENDING', max_length=10)
    submitted_at = models.DateTimeField(auto_now_add=True)