from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def root():
    return "Hello from your simple Flask backend!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    # Placeholder: add your own AI logic here!
    user_message = data.get("text", "")
    return jsonify({"response": f"You said: {user_message}"})

@app.route("/checkin", methods=["POST"])
def checkin():
    # Placeholder endpoint
    return jsonify({"response": "How are you feeling today?"})

@app.route("/challenge", methods=["POST"])
def challenge():
    # Placeholder endpoint
    return jsonify({"response": "Try saving ₦1,000 today!"})

@app.route("/funds-alert", methods=["POST"])
def funds_alert():
    data = request.get_json()
    budget = data.get("budget", 0)
    days = data.get("days", 0)
    # Placeholder
    return jsonify({"response": f"You have ₦{budget} for {days} days."})

if __name__ == "__main__":
    app.run(debug=True)
