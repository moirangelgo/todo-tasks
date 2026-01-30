from rest_framework import serializers
from .models import User, Category, Task
from .utils import generate_unique_color


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        [Category.objects.create(title=cat, user=user) for cat in ['Trabajo', 'Estudio', 'Casa', 'Familia', 'Diversión']]
        return user


class CategorySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Category
        fields = ('id', 'title')
        read_only_fields = ('id',)

    def create(self, validated_data):
        """Create category with the current user."""
        user = self.context['request'].user
        return Category.objects.create(user=user, **validated_data)


class TaskSerializer(serializers.ModelSerializer):
        
    color = serializers.CharField(read_only=True)
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'category', 'is_completed', 'color', 'created_at')
        read_only_fields = ('id', 'color', 'created_at')


    def create(self, validated_data):
        user = self.context['request'].user        
        color = generate_unique_color(user)        
        task = Task.objects.create(
            user=user,
            color=color,
            **validated_data
        )
        return task

    def validate_category(self, value):
        if value is not None:
            user = self.context['request'].user
            if value.user != user:
                raise serializers.ValidationError("Category does not belong to the current user.")
        return value
