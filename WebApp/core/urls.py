from django.urls import path 
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("api/improve-transcript/", views.improve_transcript, name="improve_transcript"),
]
