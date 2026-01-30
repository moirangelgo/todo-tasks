from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register, CategoryViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('auth/register/', register, name='register'),
    path('', include(router.urls)),
]
