from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone



class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model using email as the unique identifier."""
    
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Category(models.Model):
    """Category model for organizing tasks."""
    
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')

    class Meta:
        unique_together = ('title', 'user')
        verbose_name_plural = 'Categories'

    def __str__(self):
        return f"{self.title} - {self.user.email}"


class Task(models.Model):
    """Task model with unique color constraint per user."""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    is_completed = models.BooleanField(default=False)
    color = models.CharField(max_length=7)  # Hex color format: #RRGGBB
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'color')

    def __str__(self):
        return f"{self.title} - {self.user.email}"
