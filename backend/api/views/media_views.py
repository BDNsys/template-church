from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from api.serializers import MediaSerializer
from rest_framework.permissions import IsAuthenticated


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes= [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = MediaSerializer(data=request.data)
        if serializer.is_valid():
            media_instance = serializer.save()
            # Return the full URL of the uploaded image
            full_url = request.build_absolute_uri(media_instance.file.url)
            return Response({"image_url": full_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)