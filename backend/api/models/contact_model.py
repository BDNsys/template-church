from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return self.name
