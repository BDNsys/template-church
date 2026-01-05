from rest_framework import viewsets
from rest_framework.throttling import ScopedRateThrottle
from api.models.comment_model import Comment
from api.models.contact_model import Contact
from api.models.subscriber import Subscriber
from api.serializers.interaction_serializers import (
    CommentSerializer,
    ContactSerializer,
    SubscriberSerializer,
)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "comments"


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contacts"
    http_method_names = ["post", "head", "options"]


class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "subscribers"
    http_method_names = ["post", "head", "options"]
