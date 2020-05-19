from django.contrib.auth.models import User
from shutterapi.models import Professional, Message, Genre
from rest_framework import viewsets, permissions
from .serializers import ProfessionalSerializer, UserSerializer, MessageSerializer, GenreSerializer

# Вьюшки для сериалайзеров


class ProfessionalViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfessionalSerializer

    # Добавлено получение исполнителя по id
    def get_queryset(self):
        queryset = Professional.objects.all()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(userInfo=id)
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MessageSerializer

    # Добавлено получение сообщения по id пользователя
    def get_queryset(self):
        queryset = Message.objects.all()
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(
                userTo=id) | queryset.filter(userFrom=id)
        return queryset


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GenreSerializer
