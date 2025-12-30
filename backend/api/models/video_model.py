from django.db import models
from django.contrib.auth import get_user_model
User=get_user_model()



class Video(models.Model):
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    video1 = models.CharField(null=True, blank=True, max_length=5000)
    active = models.BooleanField(default=False)
    group = models.ForeignKey('api.ChurchGroup', on_delete=models.SET_NULL, null=True, blank=True)
    is_public = models.BooleanField(default=False, help_text="If True, everyone can see. If False, only group members see.")
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.video.name if self.video else "Video"