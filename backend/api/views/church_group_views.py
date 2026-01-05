
from rest_framework import viewsets, permissions

from django.contrib.auth import get_user_model

from api.models.groups_models import  ChurchGroup, GroupMembership
from api.serializers.church_group_serializers import (
  
    ChurchGroupSerializer, GroupMembershipSerializer, AddUserToGroupSerializer

)
from api.permissions import (
    IsSuperuser
)

User = get_user_model()
class ChurchGroupViewSet(viewsets.ModelViewSet):
    queryset = ChurchGroup.objects.all()
    serializer_class = ChurchGroupSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [IsSuperuser()] 
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class GroupMembershipViewSet(viewsets.ModelViewSet):
    queryset = GroupMembership.objects.all()
    serializer_class = GroupMembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return AddUserToGroupSerializer
        return super().get_serializer_class()