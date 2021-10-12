# Generated by Django 2.2.12 on 2021-10-12 18:06

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserPreferences',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=100, unique=True)),
                ('light_dark', models.BooleanField(default=True)),
                ('neon_pastel', models.BooleanField(default=True)),
                ('one_many_hues', models.BooleanField(default=True)),
                ('bold_subtle', models.BooleanField(default=True)),
                ('num_colors', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(1)])),
                ('main_color', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(360), django.core.validators.MinValueValidator(0)])),
            ],
        ),
    ]
