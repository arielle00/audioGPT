from django.urls import path
# from .views import main
from .views import RoomView

urlpatterns = [
    path('home', RoomView.as_view()),
    # path('', main)
]
