import os
import django
import sys

# Set up Django environment
sys.path.append('/home/nazri/Documents/bdn-workspace/django-react-jwt-authtemplate/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.urls import reverse

def verify_token_generation():
    # Create a test user
    username = 'testuser_verify'
    password = 'testpassword123'
    email = 'testuser@example.com'
    
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
    else:
        user = User.objects.create_user(username=username, password=password, email=email)
    
    print(f"User {username} created/updated.")

    # Test the token endpoint
    client = APIClient()
    url = '/api/users/token/'  # Adjust if your URL prefix is different
    data = {
        'username': username,
        'password': password
    }
    
    print(f"Testing POST to {url}...")
    response = client.post(url, data, format='json')
    
    if response.status_code == 200:
        print("Success! Token obtained.")
        print("Response keys:", response.data.keys())
        if 'access' in response.data:
            print("Access token present.")
            # Optionally decode to check claims if you want to be extra sure
            # but getting 200 OK means the serializer didn't crash.
        else:
            print("Access token MISSING in response.")
    else:
        print(f"Failed. Status code: {response.status_code}")
        print("Response data:", response.data)

if __name__ == '__main__':
    verify_token_generation()
