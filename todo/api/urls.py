from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import register, CategoryViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tasks', TaskViewSet, basename='task')


urlpatterns = [
    path('auth/register/', register, name='register'),
    path('auth/login/', obtain_auth_token, name='login'),
    path('', include(router.urls)),
]
