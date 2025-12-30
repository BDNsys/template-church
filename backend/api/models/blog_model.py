from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Blog(models.Model):
    # Enum-style choices for clarity
    CONTENT_TYPES = (
        ('blog', 'Blog Post'),
        ('announcement', 'Official Announcement'),
    )

    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    # Link to a group (from your Group model). If null, it's church-wide.
    group = models.ForeignKey('api.ChurchGroup', on_delete=models.SET_NULL, null=True, blank=True)
    
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=400, null=True, blank=True)
    text = models.TextField()
    
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES, default='blog')
    is_public = models.BooleanField(default=False, help_text="If True, everyone can see. If False, only group members see.")
    
    create_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(blank=True, null=True)
   
    likes = models.ManyToManyField(User, related_name='blog_likes', blank=True)

    def __str__(self):
        return f"[{self.get_content_type_display()}] {self.title}"
    
class BlogSection(models.Model):
    blog=models.ForeignKey(Blog, on_delete=models.CASCADE)
    sub_title = models.CharField(max_length=200)
    description = models.TextField(max_length=400, null=True, blank=True)
    text = models.TextField()    
    
    create_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='blog_images/', default='placeholder.png', null=True, blank=True)

    