from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.models.blog_model import Blog, BlogSection
from api.serializers.blog_serializers import BlogSerializer, BlogSectionSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_image(self, request, pk=None):
        blog = self.get_object()
        # Create a BlogSection with the uploaded image
        # Expecting 'image' in request.FILES and other fields in request.data
        data = request.data.copy()
        data['blog'] = blog.id
        
        serializer = BlogSectionSerializer(data=data)
        if serializer.is_valid():
            serializer.save(blog=blog)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
