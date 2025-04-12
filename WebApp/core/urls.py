from django.urls import path 
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('history/', views.transcription_history, name='history'),
    path("api/transcribe-audio/", views.transcribe_audio, name="transcribe_audio"),
    path("api/analyze-sentiment/", views.analyze_sentiment, name="analyze_sentiment"),
]