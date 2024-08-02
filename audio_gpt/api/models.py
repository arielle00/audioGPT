from django.db import models
from django.contrib.auth.models import User

class FileSave(models.Model):
    audio_name = models.CharField(max_length=50)
    audio_file = models.FileField(upload_to="audio_files/")


class ProfileSave(models.Model):
    email = models.EmailField()
    password = models.TextField()
    apikey = models.TextField()

