from rest_framework import serializers
from api.models import MediaBlog


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaBlog
        fields = ["file"]
