from django.db import models
import string
import random

class FileSave(models.Model):
    audio_name = models.CharField(max_length=50)
    audio_file = models.FileField(upload_to="audio_files/")

    