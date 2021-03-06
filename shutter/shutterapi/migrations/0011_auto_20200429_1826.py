# Generated by Django 3.0.5 on 2020-04-29 08:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shutterapi', '0010_auto_20200428_1720'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='userFrom',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='userFrom', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='userTo',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='userTo', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='professional',
            name='genre',
            field=models.ManyToManyField(blank=True, to='shutterapi.Genre'),
        ),
    ]
