from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import RoomView, CreateRoomView, GetRoom, AudioFileView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('add-audio', AudioFileView.as_view())
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)