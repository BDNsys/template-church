from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models.groups_models import  ChurchGroup, GroupMembership

User = get_user_model()

class ChurchGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChurchGroup
        fields = '__all__'
        read_only_fields = ('created_by',)

class GroupMembershipSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')
    group_name = serializers.ReadOnlyField(source='group.name')

    class Meta:
        model = GroupMembership
        fields = '__all__'
        read_only_fields = ('user', 'group')
