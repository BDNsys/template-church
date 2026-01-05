from django.db import models
from django.contrib.auth import get_user_model
from .groups_models import ChurchGroup

User = get_user_model()


class Gallery(models.Model):
    title = models.TextField(max_length=1000, null=True)
    image = models.ImageField(
        upload_to="images/",
        default="/palceholder.png",
    )
    active = models.BooleanField(default=False)
    group = models.ForeignKey(
        ChurchGroup, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_public = models.BooleanField(
        default=False,
        help_text="If True, everyone can see. If False, only group members see.",
    )
    create_at = models.DateTimeField(auto_now_add=True)
