import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from api.models import Task, Category

User = get_user_model()


@pytest.fixture
def api_client():
    """Provide an API client for tests."""
    return APIClient()


@pytest.fixture
def authenticated_user(api_client):
    """Create and authenticate a user."""
    user = User.objects.create_user(email="test@example.com", password="password123")
    api_client.force_authenticate(user=user)
    # Attach both client and user for convenience
    api_client.user = user
    return api_client


@pytest.mark.django_db
class TestTaskCreation:
    
    def test_task_creation_generates_unique_color(self, authenticated_user):
        client = authenticated_user
        user = client.user
        
        # Create a category first (as per spec)
        category = Category.objects.create(title="Trabajo", user=user)
        
        url = "/v1/tasks/"
        data = {
            "title": "Finish Project Spec",
            "category": category.id
        }
        
        response = client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert "color" in response.data
        assert response.data["color"].startswith("#")

    def test_duplicate_color_prevention(self, authenticated_user):

        client = authenticated_user
        user = client.user
        
        category = Category.objects.create(title="Personal", user=user)
        
        # Create first task
        Task.objects.create(
            title="Task 1", 
            user=user, 
            category=category, 
            color="#FF5733"
        )
        

        url = "/v1/tasks/"
        data = {"title": "Task 2", "category": category.id}
        
        response = client.post(url, data)
        assert response.data["color"] != "#FF5733"


@pytest.mark.django_db
def test_user_can_only_see_own_categories(api_client):

    user1 = User.objects.create_user(email="test@example.com", password="password")
    api_client.force_authenticate(user=user1)
    
    Category.objects.create(title="My Category", user=user1)

    other_user = User.objects.create_user(email="other@example.com", password="password")
    Category.objects.create(title="Secret Category", user=other_user)
    
    response = api_client.get("/v1/categories/")
    
    assert response.status_code == status.HTTP_200_OK

    titles = [item["title"] for item in response.data]
    assert "Secret Category" not in titles
    assert "My Category" in titles


@pytest.mark.django_db
class TestUserRegistration:
    
    def test_registration_creates_user(self, api_client):

        url = "/v1/auth/register/"
        data = {
            "email": "newuser@example.com",
            "password": "securepassword123"
        }
        
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(email="newuser@example.com").exists()
    
    def test_registration_auto_seeds_categories(self, api_client):

        url = "/v1/auth/register/"
        data = {
            "email": "newuser@example.com",
            "password": "securepassword123"
        }
        
        response = api_client.post(url, data)
        
        assert response.status_code == status.HTTP_201_CREATED
        
        user = User.objects.get(email="newuser@example.com")
        categories = Category.objects.filter(user=user)
        
        expected_categories = ['Trabajo', 'Estudio', 'Casa', 'Familia', 'Diversión']
        category_titles = [cat.title for cat in categories]
        
        for expected in expected_categories:
            assert expected in category_titles


@pytest.mark.django_db
class TestTaskOperations:
    
    def test_task_update(self, authenticated_user):

        client = authenticated_user
        user = client.user
        
        category = Category.objects.create(title="Work", user=user)
        task = Task.objects.create(
            title="Original Title",
            user=user,
            category=category,
            color="#AABBCC"
        )
        
        url = f"/v1/tasks/{task.id}/"
        data = {"title": "Updated Title", "is_completed": True}
        
        response = client.patch(url, data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data["title"] == "Updated Title"
        assert response.data["is_completed"] is True
    
    def test_task_delete(self, authenticated_user):

        client = authenticated_user
        user = client.user
        
        category = Category.objects.create(title="Work", user=user)
        task = Task.objects.create(
            title="To Delete",
            user=user,
            category=category,
            color="#AABBCC"
        )
        
        url = f"/v1/tasks/{task.id}/"
        response = client.delete(url)
        
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Task.objects.filter(id=task.id).exists()
    
    def test_user_cannot_access_other_users_tasks(self, api_client):

        user1 = User.objects.create_user(email="user1@example.com", password="password")
        user2 = User.objects.create_user(email="user2@example.com", password="password")
        

        cat1 = Category.objects.create(title="Cat1", user=user1)
        cat2 = Category.objects.create(title="Cat2", user=user2)
        

        Task.objects.create(title="User 1 Task", user=user1, category=cat1, color="#111111")
        Task.objects.create(title="User 2 Task", user=user2, category=cat2, color="#222222")
        

        api_client.force_authenticate(user=user1)
        response = api_client.get("/v1/tasks/")
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["title"] == "User 1 Task"
