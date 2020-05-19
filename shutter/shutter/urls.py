from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Добавляем урлы от подключенных приложений
# Ещё добавляем папку для media в урлы

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('shutterapi.urls')),
    path('', include('accounts.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL,
           document_root=settings.MEDIA_ROOT)
