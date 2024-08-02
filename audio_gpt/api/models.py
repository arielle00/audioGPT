from django.db import models
from django.contrib.auth.models import User

class FileSave(models.Model):
    audio_name = models.CharField(max_length=50)
    audio_file = models.FileField(upload_to="audio_files/")


class ProfileSave(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    password = models.TextField()
    apikey = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.email}"
