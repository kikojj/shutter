# Generated by Django 3.0.5 on 2020-04-28 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shutterapi', '0009_brand'),
    ]

    operations = [
        migrations.AddField(
            model_name='professional',
            name='direction',
            field=models.CharField(blank=True, choices=[('photoshoot', 'Фотосессии'), ('impressions', 'Показы'), ('agencies', 'Агентства'), ('advertising', 'Реклама'), ('filming', 'Киносъёмки')], max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='professional',
            name='genre',
            field=models.ManyToManyField(blank=True, null=True, to='shutterapi.Genre'),
        ),
        migrations.AlterField(
            model_name='professional',
            name='profession',
            field=models.CharField(blank=True, choices=[('model', 'Модель'), ('photographer', 'Фотограф'), ('visagiste', 'Визажист'), ('brand', 'Брэнд')], max_length=128, null=True),
        ),
        migrations.DeleteModel(
            name='Brand',
        ),
    ]