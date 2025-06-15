
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from openai import OpenAI
import os

# Load .env if present (useful for local testing)
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow all CORS

# API keys from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You're SaavyBee - a human-like financial friend, counsellor and assistant. Rules:
1. Respond like a human friend, not a robot
2. Use MAX 1 emoji per message when natural
3. For bad decisions, be stern but helpful and empathetic. E.g. "That's not good, lets fix it"
4. For good moves, be encouraging and supportive: "Solid progress". 
5. Keep responses under 3 sentences but flesh out if need be 
6. Tie financial habits to health. For example: "Skipping that ₦6k drink twice a week = 1 month of gym access."
7. Engage users in personalized challenges based on financial data
8. Light check-in convos like: "How are you feeling about money today?"
9. Tailor tips to user context (budget relief, detox, mental health)
10. If funds low: "₦3k left and 9 days to payday. Need a survival plan?"
11. Strict limit on vulgar language
"""

@app.route('/')
def home():
    return jsonify({"message": "Backend is running."})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get("message")
        if not message:
            return jsonify({"error": "No message provided"}), 400

        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ],
            model="llama3-70b-8192",
            temperature=0.7,
            max_tokens=150
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file uploaded'}), 400

    audio_file = request.files['audio']
    filename = secure_filename(audio_file.filename)
    filepath = f"/tmp/{filename}"
    audio_file.save(filepath)

    try:
        with open(filepath, "rb") as f:
            transcript = openai_client.audio.transcriptions.create(
                file=f,
                model="whisper-1"
            )
        return jsonify({'transcription': transcript.text})
    except Exception as e:
        return jsonify({'error': 'Transcription failed', 'details': str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(filepath):
            os.remove(filepath)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
