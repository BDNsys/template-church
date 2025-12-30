from rest_framework import serializers
from api.models.blog_model import Blog, BlogSection

class BlogSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogSection
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    sections = BlogSectionSerializer(source='blogsection_set', many=True, read_only=True)
    
    class Meta:
        model = Blog
        fields = '__all__'
