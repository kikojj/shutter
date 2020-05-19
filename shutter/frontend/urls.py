from django.urls import path
from . import views

# Здесь только урлы, name для React Router

urlpatterns = [
    path('', views.index, name='/'),
    path('profile', views.index, name='/profile'),
    path('profile/<int:id>', views.index),
    path('im', views.index, name='/im'),
    path('login', views.index, name='/login'),
    path('registration', views.index, name='/registration')
]
