# Generated by Django 3.2.8 on 2021-10-30 19:37

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PaletteModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=100, unique=True)),
                ('base_color', models.CharField(max_length=6)),
                ('palette_list', models.TextField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='UserPreferences',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=100, unique=True)),
                ('light_dark', models.BooleanField(default=False)),
                ('neon_pastel', models.BooleanField(default=False)),
                ('one_many_hues', models.BooleanField(default=False)),
                ('bold_subtle', models.BooleanField(default=False)),
                ('num_colors', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(1)])),
                ('main_color', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(360), django.core.validators.MinValueValidator(0)])),
            ],
        ),
    ]
