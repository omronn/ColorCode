from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here. Effectively DB Schema


class UserPreferences(models.Model):
    # This will be the users session key
    user = models.CharField(max_length=100, unique=True)

    # For all switches, left is false, right is true
    # Names of variables correspond to switch orientation
    light_dark = models.BooleanField(null=False, default=False)
    neon_pastel = models.BooleanField(null=False, default=False)
    one_many_hues = models.BooleanField(null=False, default=False)
    bold_subtle = models.BooleanField(null=False, default=False)

    # Number of colors and hue selection
    num_colors = models.IntegerField(null=False, default=1,
                                     validators=[MaxValueValidator(
                                         10), MinValueValidator(1)]
                                     )

    main_color = models.CharField(null=False, max_length=7, default='#ad0909')
    """
    main_color = models.IntegerField(null=False, default=0,
                                     validators=[MaxValueValidator(
                                         360), MinValueValidator(0)]
                                     )
    """


class PaletteModel(models.Model):
    #user = models.ForeignKey(UserPreferences, on_delete=models.CASCADE)
    user = models.CharField(max_length=100, unique=True)
    base_color = models.CharField(max_length=6)  # THE BASE COLOR: hexadecimal
    palette_list = models.TextField(max_length=150)
