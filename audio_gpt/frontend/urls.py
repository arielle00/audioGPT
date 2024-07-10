
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
    path('create',index),
    path('chat/',index),
    path('room/<str:roomCode>', index)
]
