from django.db import models

class FileSave(models.Model):
    audio_name = models.CharField(max_length=50)
    audio_file = models.FileField(upload_to="audio_files/")


class ProfileSave(models.Model):
    username = models.TextField()
    email = models.EmailField()
    password = models.TextField()
    apikey = models.TextField()

