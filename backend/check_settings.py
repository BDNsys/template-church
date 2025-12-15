import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

print(f"SOCIAL_AUTH_GOOGLE_CLIENT_ID: {settings.SOCIAL_AUTH_GOOGLE_CLIENT_ID}")
print(f"SOCIALACCOUNT_PROVIDERS: {settings.SOCIALACCOUNT_PROVIDERS}")
print(f"LOGIN_REDIRECT_URL: {settings.LOGIN_REDIRECT_URL}")
print(f"SOCIALACCOUNT_LOGIN_ON_GET: {getattr(settings, 'SOCIALACCOUNT_LOGIN_ON_GET', 'Not Set')}")
