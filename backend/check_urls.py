import os
import django
from django.conf import settings
from django.urls import get_resolver

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

def print_urls(urlpatterns, prefix=''):
    for entry in urlpatterns:
        if hasattr(entry, 'url_patterns'):
            # It's an include
            new_prefix = prefix + str(entry.pattern)
            print_urls(entry.url_patterns, new_prefix)
        else:
            print(f"{prefix}{entry.pattern} -> {entry.callback}")

print("Registered URLs:")
print_urls(get_resolver().url_patterns)
