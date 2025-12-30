from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models.finance_models import  FinanceRecord



class FinanceRecordSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source='created_by.username')
    approved_by_username = serializers.ReadOnlyField(source='approved_by.username')

    class Meta:
        model = FinanceRecord
        fields = '__all__'
        read_only_fields = ('created_by', 'approved_by', 'status', 'created_at', 'updated_at')
