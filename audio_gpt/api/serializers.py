from rest_framework import serializers
from .models import FileSave
from .models import ProfileSave


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSave
        fields = ('audio_name', 'audio_file')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileSave
        fields = ('username', 'email', 'password', 'apikey')
