from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from openai import OpenAI
import os
import json

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

ANALYSIS_SYSTEM_PROMPT = """
You are a financial analyst and psychologist AI. Your task is to analyze a user's chat history and provide a concise, insightful profile. The user is seeking to understand themselves better, particularly their financial habits and personality.

**Analysis Input:** You will receive a JSON object containing a `chat_history`, which is a list of messages.

**Output Format:** You MUST return a JSON object with the following structure. Do NOT include any explanations or markdown formatting like ```json.

{
  "personality_sketch": {
    "title": "Personality Sketch",
    "description": "A brief, empathetic summary of the user's apparent personality (e.g., curious, reserved, anxious, confident).",
    "emoji": "🧐"
  },
  "spending_habit_profile": {
    "title": "Spending Habit Profile",
    "description": "An analysis of the user's financial habits based on the conversation. Identify patterns (e.g., impulsive spending, diligent saving, anxiety about bills). If no data, state that.",
    "emoji": "💸"
  },
  "interests_themes": {
    "title": "Interests & Themes",
    "description": "Identify recurring topics or themes in the conversation (e.g., career stress, family, specific financial goals, hobbies).",
    "emoji": "💡"
  },
  "savvy_insight": {
    "title": "Savvy Bee's Insight",
    "description": "A single, actionable piece of advice or an encouraging observation, like a friend would give. Tie it to their situation. Be supportive and gentle.",
    "emoji": "🐝"
  }
}

**Rules:**
1.  **Be Empathetic and Non-Judgmental:** Frame observations constructively.
2.  **Infer, Don't Assume:** Base your analysis strictly on the provided text. If there's not enough information for a category, state "Not enough information to determine."
3.  **Keep it Concise:** Each description should be 1-2 sentences long.
4.  **JSON ONLY:** Your entire response must be a single, valid JSON object.
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

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        chat_history = data.get("chat_history")

        if not chat_history:
            return jsonify({"error": "No chat history provided"}), 400

        # Format chat history for the model
        formatted_history = "\n".join([f"{'User' if msg['isUser'] else 'AI'}: {msg['text']}" for msg in chat_history])

        user_content = f"Please analyze the following conversation:\n\n{formatted_history}"

        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": ANALYSIS_SYSTEM_PROMPT},
                {"role": "user", "content": user_content}
            ],
            model="llama3-70b-8192",
            temperature=0.5,
            response_format={"type": "json_object"} # Use JSON mode
        )
        analysis_json_str = response.choices[0].message.content
        analysis_data = json.loads(analysis_json_str)
        return jsonify(analysis_data)

    except Exception as e:
        app.logger.error(f"Analysis Error: {e}")
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

# ------- Feature Endpoints --------

@app.route('/upload-receipt', methods=['POST'])
def upload_receipt():
    if 'file' not in request.files:
        return jsonify({'error': 'No receipt uploaded'}), 400
    # Save file & placeholder response; real OCR/processing coming soon
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join("/tmp", filename))
    return jsonify({'message': 'Receipt uploaded successfully', 'filename': filename})

@app.route('/upload-document', methods=['POST'])
def upload_document():
    if 'file' not in request.files:
        return jsonify({'error': 'No document uploaded'}), 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join("/tmp", filename))
    return jsonify({'message': 'Document uploaded successfully', 'filename': filename})

@app.route("/checkin", methods=["POST"])
def checkin():
    data = request.get_json()
    mood = data.get("mood", "neutral")
    note = data.get("note", "")
    # In real use: store this event
    return jsonify({"message": f"Mood check-in received ({mood}). Note: {note}"})

@app.route("/challenge", methods=["POST"])
def challenge():
    # Placeholder: Recommend a financial challenge
    return jsonify({"challenge": "Try saving ₦1,000 today 🐝"})

@app.route("/funds-alert", methods=["POST"])
def funds_alert():
    data = request.get_json()
    budget = data.get("budget", 0)
    days = data.get("days", 0)
    # Example response, expand for logic later
    if budget <= 0:
        return jsonify({"alert": "You are out of funds! Emergency measures needed."})
    n_per_day = budget / days if days else 0
    return jsonify({
        "alert": f"You have ₦{budget} left for {days} days. That's about ₦{n_per_day:.0f}/day. Keep going!"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
