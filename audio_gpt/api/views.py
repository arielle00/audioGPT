from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, FileSerializer
from .models import Room
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import assemblyai as aai
from dotenv import load_dotenv
import os

load_dotenv()
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found'}, status.HTTP_404_NOT_FOUND)
        return Response({'Bad Rquest': 'Code paramater not found'}, status=status.HTTP_400_BAD_REQUEST)


class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class AudioFileView(APIView):
    serializer_class = FileSerializer
    def post(self, request, format=None):
        data = request.data.copy()
        audiofile = request.FILES['audio_file']
        print("-----" + str(audiofile))
        serializer = self.serializer_class(data=request.data)
        #print(serializer.data)
        data.update(request.FILES)
        print(serializer.is_valid())
        if serializer.is_valid():
            audio_name = data.get('audio_name')
            audio_file = data.get('audio_file')
            print(audio_name)
            

            aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
            transcriber = aai.Transcriber()

            transcript = transcriber.transcribe(audio_file)
            # transcript = transcriber.transcribe("./my-local-audio-file.wav")

            print(transcript.text)
            print(type(audio_file))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


# 
