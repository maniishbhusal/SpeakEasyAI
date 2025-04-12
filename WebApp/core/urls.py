from django.urls import path 
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("api/transcribe-audio/", views.transcribe_audio, name="transcribe_audio"),
    path("api/analyze-sentiment/", views.analyze_sentiment, name="analyze_sentiment"),
]