# Generated by Django 3.0.5 on 2020-04-26 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shutterapi', '0004_professional_userinfo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userFrom', models.CharField(max_length=32, null=True)),
                ('userTo', models.CharField(max_length=32, null=True)),
                ('text', models.TextField(null=True)),
                ('dateTime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='professional',
            name='photo',
            field=models.ImageField(blank=True, default='images/default.png', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='professional',
            name='profession',
            field=models.CharField(blank=True, choices=[('model', 'Модель'), ('photographer', 'Фотограф'), ('visagiste', 'Визажист')], max_length=128, null=True),
        ),
    ]
