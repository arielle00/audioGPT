from rest_framework import serializers
from .models import FileSave
from .models import ProfileSave, CustomProfile
from django.contrib.auth import authenticate


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSave
        fields = ('audio_name', 'audio_file')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileSave
        fields = ('username', 'email', 'password', 'apikey')

class CustomProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomProfile
        fields = ['id', 'username', 'email', 'apikey']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError("Invalid username or password.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")
        
        data['user'] = user
        return data