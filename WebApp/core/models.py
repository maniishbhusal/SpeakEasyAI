from django.db import models
from django.contrib.auth.models import User

class TranscriptionRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transcriptions')
    text = models.TextField()
    sentiment_score = models.FloatField(null=True, blank=True)
    sentiment_label = models.CharField(max_length=20, null=True, blank=True)
    sentiment_analysis = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Transcription by {self.user.username} on {self.created_at.strftime('%Y-%m-%d %H:%M')}"