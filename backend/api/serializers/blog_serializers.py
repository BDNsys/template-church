from rest_framework import serializers
from api.models import Blog, BlogSection,GroupMembership


class BlogSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogSection
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    sections = BlogSectionSerializer(
        source="blogsection_set", many=True, read_only=True
    )


    class Meta:
        model = Blog
        fields = "__all__"
        read_only_fields = ("author", "likes")
    def validate(self, attrs):
        """
        Validate that the author can only assign groups they are a member of.
        Also check if they have blog management permission for that group.
        """
        user = self.context['request'].user
        group = attrs.get('group')
        
        # If no group is specified, it's a church-wide blog - allow it
        if group is None:
            return super().validate(attrs)
        
        # Check if user is a member of the specified group
        try:
            membership = GroupMembership.objects.get(user=user, group=group)
        except GroupMembership.DoesNotExist:
            raise serializers.ValidationError({
                "group": f"You are not a member of the group '{group.name}'. "
                        f"You can only create blogs for groups you belong to."
            })
        
        # Check if user has blog management permission for this group
        if not membership.can_manage_blog:
            raise serializers.ValidationError({
                "group": f"You don't have blog management permission for the group '{group.name}'. "
                        f"Contact your group administrator to get permission."
            })
        
        # # Additional validations based on user role in the group
        # if membership.role == "AUDITOR":
        #     # Auditors might have different permissions - you can add specific logic here
        #     pass
        
        return super().validate(attrs)
    
    def create(self, validated_data):
        """
        Set the author to the current user and ensure they have permission
        """
        request = self.context.get('request')
        user = request.user
        
        # If group is specified, double-check permission
        group = validated_data.get('group')
        if group:
            try:
                membership = GroupMembership.objects.get(user=user, group=group)
                if not membership.can_manage_blog:
                    raise serializers.ValidationError({
                        "group": f"You don't have permission to create blogs for {group.name}"
                    })
            except GroupMembership.DoesNotExist:
                raise serializers.ValidationError({
                    "group": f"You are not a member of {group.name}"
                })
        
        # Set the author
        validated_data['author'] = user
        
        return super().create(validated_data)
