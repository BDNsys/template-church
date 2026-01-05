from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    is_approved_member = models.BooleanField(default=False)

    # Global roles (assigned by Superuser)
    is_global_auditor = models.BooleanField(default=False)

    def __str__(self):
        return self.username
