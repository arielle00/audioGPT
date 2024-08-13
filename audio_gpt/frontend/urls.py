
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home/chat/',index),
    path('home/', index),
    path('signup/', index),
    path('permissionDenied/', index),
    path('home/settings/', index),
]
