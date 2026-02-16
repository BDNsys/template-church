from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.models.blog_model import Blog, BlogSection
from api.serializers import BlogSerializer, BlogSectionSerializer, MediaSerializer
from rest_framework.permissions import IsAuthenticated
from api.permissions import CanManageBlog
from django.utils import timezone


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [ CanManageBlog]
    
    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """
        Custom action to set the published_at date to now.
        URL: POST /api/blogs/{id}/publish/
        """
        blog = self.get_object()
        
        # Optional: Check if already published
        if blog.published_at:
            return Response(
                {"detail": "Blog is already published."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set the publication time
        blog.published_at = timezone.now()
        blog.save()

        # Return the updated blog data
        serializer = self.get_serializer(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    


class BlogSectionViewSet(viewsets.ModelViewSet):
    queryset = BlogSection.objects.all()
    serializer_class = BlogSectionSerializer
    permission_classes = [IsAuthenticated, CanManageBlog]

    @action(detail=True, methods=["post"], parser_classes=[MultiPartParser, FormParser])
    def upload_image(self, request, *args, **kwargs):
        serializer = MediaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        media_instance = serializer.save()
        full_url = request.build_absolute_uri(media_instance.file.url)
        return Response({"image_url": full_url}, status=status.HTTP_201_CREATED)
