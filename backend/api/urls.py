from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from api.views.church_group_views import (
 
    ChurchGroupViewSet, GroupMembershipViewSet
)
from api.views.membership_views import (
      MemberViewSet, MembershipRequestViewSet, 
    
)
from api.views.finance_record_views import FinanceRecordViewSet
from api.views.blog_views import BlogViewSet
from api.views.video_views import VideoViewSet
from api.views.gallery_views import GalleryViewSet
from api.views.interaction_views import CommentViewSet, ContactViewSet, SubscriberViewSet



router = DefaultRouter()
router.register(r'members', MemberViewSet)
router.register(r'membership-requests', MembershipRequestViewSet)
router.register(r'groups', ChurchGroupViewSet)
router.register(r'group-memberships', GroupMembershipViewSet)
router.register(r'finance', FinanceRecordViewSet)

router.register(r'blogs', BlogViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'gallery', GalleryViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'subscribers', SubscriberViewSet)

urlpatterns = [
  
   
    path('', include(router.urls)),
    
    # Swagger
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]