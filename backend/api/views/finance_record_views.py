from rest_framework import viewsets, permissions
from django.contrib.auth import get_user_model
from api.models.finance_models import FinanceRecord
from rest_framework.decorators import action

from api.serializers.finance_record_serializer import (
    FinanceRecordSerializer
)
from api.permissions import (
    IsFinanceMaker, IsFinanceApprover, IsFinanceAuditor
)
from rest_framework.response import Response
User = get_user_model()
class FinanceRecordViewSet(viewsets.ModelViewSet):
    queryset = FinanceRecord.objects.all()
    serializer_class = FinanceRecordSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsFinanceMaker()]
        if self.action in ['update', 'partial_update']:
            return [IsFinanceMaker()]
        if self.action == 'destroy':
            return [IsFinanceAuditor()]
        if self.action == 'approve':
            return [IsFinanceApprover()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, status='PENDING')

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        record = self.get_object()
        if record.created_by == request.user:
            return Response({"error": "Cannot approve your own record"}, status=403)
        
        record.status = 'APPROVED'
        record.approved_by = request.user
        record.save()
        return Response({'status': 'approved'})