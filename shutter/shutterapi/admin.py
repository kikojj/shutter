from django.contrib import admin
from .models import Professional, Message

# Регистрация моделей для отображения
admin.site.register(Professional)
admin.site.register(Message)
