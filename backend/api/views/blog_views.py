from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.models.blog_model import Blog, BlogSection
from api.serializers import BlogSerializer, BlogSectionSerializer, MediaSerializer
from rest_framework.permissions import IsAuthenticated
from api.permissions import CanManageBlog


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


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
