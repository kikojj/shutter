from django.shortcuts import render

# Тут как бы только подключение темплэйта, id для страницы профилей


def index(request, id=-1):
    return render(request, 'index.html')
