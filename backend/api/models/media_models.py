from django.db import models


class MediaBlog(models.Model):
    file = models.ImageField(upload_to="blog_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
