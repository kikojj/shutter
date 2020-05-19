from rest_framework import routers
from django.urls import path, include
from .api import ProfessionalViewSet, UserViewSet, MessageViewSet, GenreViewSet

# Урлы для API

router = routers.DefaultRouter()
router.register('api/proffesionals', ProfessionalViewSet, 'proffesionals')
router.register('^api/proffesionals/(?P<id>.+)/$',
                ProfessionalViewSet, 'proffesionals')
router.register('api/users', UserViewSet, 'users')
router.register('api/messages', MessageViewSet, 'messages')
router.register(
    '^api/messages/(?P<id>.+)/$', MessageViewSet, 'messages')
router.register('api/genre', GenreViewSet, 'genre')

urlpatterns = router.urls
