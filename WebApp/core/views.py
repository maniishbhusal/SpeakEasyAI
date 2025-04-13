from django.shortcuts import render, redirect
import openai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
import json
import os
import tempfile
from dotenv import load_dotenv
from .models import TranscriptionRecord

load_dotenv()


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'core/login.html', {'form': form})


def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'core/signup.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def home(request):
    # Get user's transcription history
    user_transcriptions = TranscriptionRecord.objects.filter(
        user=request.user).order_by('-created_at')[:5]
    return render(request, 'core/home.html', {'transcriptions': user_transcriptions})


@login_required
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

                # Save to database (without sentiment yet)
                record = TranscriptionRecord(
                    user=request.user,
                    text=transcription
                )
                record.save()

                # Clean up the temporary file
                os.unlink(temp_file_path)

                return JsonResponse({
                    "transcription": transcription,
                    "record_id": record.id
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


@login_required
@csrf_exempt
def analyze_sentiment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("text", "")
            record_id = data.get("record_id", None)

            if not text:
                return JsonResponse({"error": "Missing text"}, status=400)

            client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

            # Get sentiment analysis from OpenAI
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": """
                     You are a highly intelligent post-meeting analysis assistant, built for fast-moving startups and modern organizations. Your job is to analyze the transcript of a recorded team meeting and generate a world-class executive dashboard review.
                     
                     Return a JSON object with these fields:
                     - sentiment: an object with 'score' (number between -1 and 1) and 'label' ("POSITIVE", "NEGATIVE", or "NEUTRAL")
                     - analysis: a brief 1-2 sentence summary of the overall sentiment
                     - key_phrases: an array of important phrases from the text (limit to 5)
                     - summary: a high-level summary with 3-5 bullet points about core purpose and key decisions
                     - action_items: array of action items mentioned in the meeting
                     - speaker_dynamics: text analysis of speaker participation patterns
                     - clarity_issues: text highlighting any confusion points in the meeting
                     - people_signals: insights about team dynamics and engagement
                     - meeting_duration: estimated meeting length (if detectable from transcript)
                     - topics: array of main topics discussed (limit to 3-5)
                     """},
                    {"role": "user", "content": text}
                ],
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)

            # Update the database record with sentiment information if record_id is provided
            if record_id:
                try:
                    record = TranscriptionRecord.objects.get(
                        id=record_id, user=request.user)
                    record.sentiment_score = result.get('sentiment', {}).get('score', 0)
                    record.sentiment_label = result.get('sentiment', {}).get('label', 'NEUTRAL')
                    record.sentiment_analysis = result.get('analysis', '')
                    record.save()
                except TranscriptionRecord.DoesNotExist:
                    pass

            return JsonResponse(result)

        except Exception as e:
            print("Error analyzing sentiment:", str(e))
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)

@login_required
def transcription_history(request):
    user_transcriptions = TranscriptionRecord.objects.filter(
        user=request.user).order_by('-created_at')
    return render(request, 'core/history.html', {'transcriptions': user_transcriptions})
