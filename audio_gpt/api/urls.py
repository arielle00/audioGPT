from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import AudioFileView, MessageView, Signup, Login

urlpatterns = [
    path('add-audio', AudioFileView.as_view()),
    path('add-message', MessageView.as_view()),
    path('signup', Signup.as_view()),
    path('login', Login.as_view())
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
