from rest_framework import serializers
from .models import FileSave


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSave
        fields = ('audio_name', 'audio_file')
