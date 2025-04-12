from django.shortcuts import render
import openai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import tempfile
from dotenv import load_dotenv

load_dotenv()

def home(request):
    return render(request, 'core/home.html')

@csrf_exempt
def transcribe_audio(request):
    if request.method == "POST" and request.FILES.get('audio_file'):
        try:
            audio_file = request.FILES['audio_file']
            
            # Create a temporary file to store the uploaded audio
            with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as temp_file:
                for chunk in audio_file.chunks():
                    temp_file.write(chunk)
                temp_file_path = temp_file.name
            
            try:
                # Use OpenAI Whisper API for transcription
                client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
                
                with open(temp_file_path, "rb") as audio_file:
                    response = client.audio.transcriptions.create(
                        model="whisper-1",
                        file=audio_file
                    )
                
                transcription = response.text
                
                # Clean up the temporary file
                os.unlink(temp_file_path)
                
                return JsonResponse({
                    "transcription": transcription
                })
                
            except Exception as e:
                # Clean up the temporary file in case of error
                if os.path.exists(temp_file_path):
                    os.unlink(temp_file_path)
                raise e
                
        except Exception as e:
            print("Error in transcribing audio:", str(e))
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def analyze_sentiment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("text", "")
            
            if not text:
                return JsonResponse({"error": "Missing text"}, status=400)
            
            client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
            
            # Get sentiment analysis from OpenAI
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": """
                     Analyze the sentiment of the following text. 
                     Return a JSON object with these fields:
                     - sentiment.score: a number between -1 (very negative) and 1 (very positive)
                     - sentiment.label: "POSITIVE", "NEGATIVE", or "NEUTRAL"
                     - analysis: a brief 1-2 sentence summary of the sentiment
                     - key_phrases: an array of important phrases from the text
                     """},
                    {"role": "user", "content": text}
                ],
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            
            return JsonResponse(result)
            
        except Exception as e:
            print("Error analyzing sentiment:", str(e))
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Invalid request"}, status=400)