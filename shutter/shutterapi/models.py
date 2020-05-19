from django.contrib.auth.models import User
from django.db import models


# Необходимые константы
PROFESSIONS = (
    ('model', 'Модель'),
    ('photographer', 'Фотограф'),
    ('visagiste', 'Визажист'),
    ('brand', 'Брэнд'),
)
SEX = (
    ('man', 'Мужчина'),
    ('woman', 'Женщина')
)
KIND_OF_WORK = (
    ('price', 'За оплату'),
    ('free', 'Бесплатно'),
    ('creativeProject', 'Творческий проект')
)

GENRES = (
    ('beauty', 'Красота'),
    ('fashion', 'Мода'),
    ('studio', 'Студия'),
    ('street', 'Улица'),
    ('fashionShows', 'Показ мод'),
    ('filming', 'Киносъёмки'),
    ('clothes', 'Одежда'),
    ('lingerie', 'Бельё'),
    ('sports', 'Спорт'),
    ('erotic', 'Эротика')
)

DIRECTIONS = (
    ('photoshoot', 'Фотосессии'),
    ('impressions', 'Показы'),
    ('agencies', 'Агентства'),
    ('advertising', 'Реклама'),
    ('filming', 'Киносъёмки'),
)


# Модель для жанры работы(название)
class Genre(models.Model):
    title = models.CharField(max_length=128)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


# Модель для исполнителя(пользователь, фото, профессия, пол, город, возраст, вес, рост, опыт, оплата, тип работы, жанр, дополнительная информация, направление - для брэнда, дата создания)
class Professional(models.Model):
    userInfo = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    photo = models.ImageField(
        upload_to='images/', default='images/default.png', blank=True)
    profession = models.CharField(
        max_length=128, choices=PROFESSIONS, blank=True, null=True)
    sex = models.CharField(max_length=16, choices=SEX, blank=True, null=True)
    city = models.CharField(max_length=128, blank=True, null=True)

    age = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    experience = models.IntegerField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)

    kindOfWork = models.CharField(
        max_length=16, choices=KIND_OF_WORK, blank=True, null=True)
    genre = models.ManyToManyField(Genre, blank=True, null=True)

    additional_info = models.TextField(max_length=1000, null=True, blank=True)

    direction = models.CharField(
        max_length=64, choices=DIRECTIONS, blank=True, null=True)

    dateTime = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.userInfo.username


# Модель для сообщение(от кого, кому, текст, прочитано, время отправки)
class Message(models.Model):
    userFrom = models.IntegerField(null=True)
    userTo = models.IntegerField(null=True)
    text = models.TextField(null=True)

    checked = models.BooleanField(default=False)
    dateTime = models.DateTimeField(auto_now_add=True)
