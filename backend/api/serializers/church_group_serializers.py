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
class AddUserToGroupSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=False, write_only=True)
    role = serializers.CharField(required=False, write_only=True)

    def validate(self, data):
        group_id = data.get('group_id')
        role=data.get('role')

        if not group_id:
            raise serializers.ValidationError("group_id must be provided.")

        try:
            if group_id:
                data['group'] = ChurchGroup.objects.get(id=group_id)
            if role:
                data['role'] =role
        except ChurchGroup.DoesNotExist:
            raise serializers.ValidationError("Church group not found.")
        
        

        return data

    def create(self, validated_data):
        user = self.context['request'].user
        group = validated_data['group']
        role = validated_data['role']
        membership, _ = GroupMembership.objects.get_or_create(user=user, group=group, role=role)
        return membership
