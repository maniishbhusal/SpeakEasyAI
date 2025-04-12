from django.shortcuts import render
import openai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from dotenv import load_dotenv

load_dotenv()


def home(request):
    return render(request, 'core/home.html')


@csrf_exempt
def improve_transcript(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # 🔥 See if 'text' is here

            user_text = data.get("transcript", "")
            if not user_text:
                return JsonResponse({"error": "Missing text"}, status=400)

            client = openai.OpenAI(
                api_key=os.getenv('OPENAI_API_KEY')
            )
            # response = client.chat.completions.create(
            #     model="gpt-4",
            #     messages=[
            #         {"role": "system", "content": "Enhance this transcript to be well-structured and clearer."},
            #         {"role": "user", "content": user_text}
            #     ]
            # )

            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "Enhance this transcript to be well-structured and clearer."},
                    {"role": "user", "content": user_text}
                ]
            )

            improved_text = response.choices[0].message.content

            # response = client.responses.create(
            #     model="gpt-4o",
            #     instructions="Enhance this transcript to be well-structured and clearer.",
            #     input=user_text,
            # )
            print("response data...", response)
            # improved_text = response.choices[0].message.content
            # improved_text = response.output

            return JsonResponse({"improved_text": improved_text})
        except Exception as e:
            print("Error:", e)
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request"}, status=400)
