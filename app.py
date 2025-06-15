
from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import Optional, List, Dict
import random

app = FastAPI()

# ----- Data Models -----

class ChatRequest(BaseModel):
    text: str
    username: Optional[str] = "friend"
    mood: Optional[str] = None
    budget: Optional[float] = None
    days_to_payday: Optional[int] = None
    habits: Optional[List[str]] = []
    past_challenges: Optional[List[Dict]] = []

# --- Behavioral Data ---
HEALTH_SWAP_EXAMPLES = [
    ("₦6k drinks", "a month of gym access"),
    ("₦4k latte", "a week of healthy meal preps"),
    ("ordering takeaway", "a therapy session"),
    ("impulse online shop", "two self-care days budget"),
]

AI_EMOJIS = ["😊", "👍", "🎯", "🚀", "💪", "🍀", "😅", "🧘", "🤑", "🏆", "🙌", "💡", "❤️"]

ENCOURAGEMENTS = [
    "Solid progress",
    "You’re building real momentum",
    "That’s an impressive step forward",
    "Keep it up. You’re doing great",
    "That’s how habits are made"
]

BAD_MOVE_RESPONSES = [
    "That's not the move — let's course-correct!",
    "Oops, not ideal. Let's get you on track!",
    "Hmm, we can do better — let's fix it together",
    "Let's rethink that plan for a stronger outcome",
    "Well, that’s a setback — but we can rebound!"
]

BUDGET_ALERTS = [
    "₦{budget} left and {days} days to payday. Need a survival plan?",
    "You’ve got ₦{budget} for {days} days — let's stretch it together!",
    "Low funds: ₦{budget} for {days} days. Ready to strategize?"
]

# --- Helper Functions ---

def select_emoji():
    return random.choice(AI_EMOJIS)

def good_move():
    return f"{random.choice(ENCOURAGEMENTS)}. {select_emoji()}"

def bad_move():
    return f"{random.choice(BAD_MOVE_RESPONSES)} {select_emoji()}"

def make_health_swap():
    spend, swap = random.choice(HEALTH_SWAP_EXAMPLES)
    return f"Skipping that {spend} = {swap}."

def checkin_question():
    return random.choice([
        "How are you feeling about money today?",
        "What’s your financial vibe right now?",
        "Got any money worries today?"
    ])

def budget_alert(budget: float, days: int):
    alert = random.choice(BUDGET_ALERTS)
    return alert.format(budget=round(budget, 2), days=days)

def challenge_prompt():
    suggestions = [
        "How about saving ₦1k/day this week for something fun?",
        "Try a 'no-spend weekend' — game on?",
        "Beat your record for cooking at home this week?",
        "Could you review your spending for surprises today?"
    ]
    return random.choice(suggestions)

def validate_tip(context: Optional[str]=None):
    if context == "stress":
        return "Money stress is real — but you’re not alone. Let’s break it down into easy steps 💡"
    elif context == "budget relief":
        return "For quick relief, try a one-week essentials-only challenge. You might be surprised!"
    elif context == "detox":
        return "A few days off impulse shopping can refresh your mind and wallet."
    elif context == "mental health":
        return "Finances and mental health go hand-in-hand. Maybe invest in a self-care day?"
    return "Small changes = big progress. Want a quick tip?"

# --- Endpoints ---

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    user_input = req.text.lower()
    # Very simple profanity filter
    bad_words = ["fuck", "shit", "bitch", "damn"]
    if any(word in user_input for word in bad_words):
        return {"msg": "Let’s keep things positive and respectful. What’s on your mind?"}

    # Check for check-in starter
    if "how are you" in user_input or "check-in" in user_input:
        return {"msg": f"{checkin_question()}"}

    # Good vs bad moves
    if "saved" in user_input or "skipped" in user_input or "cancelled subscription" in user_input:
        return {"msg": good_move()}
    if "splurged" in user_input or "bought" in user_input or "impulse" in user_input:
        return {"msg": bad_move()}

    # Health swap
    if "swap" in user_input or "healthy" in user_input:
        return {"msg": make_health_swap()}

    # Budget warning
    if req.budget and req.days_to_payday and req.budget < 4000:
        return {"msg": budget_alert(req.budget, req.days_to_payday)}

    # Challenge request
    if "challenge" in user_input:
        return {"msg": challenge_prompt()}

    # Mental health
    if "mental health" in user_input or req.mood == "anxious":
        return {"msg": validate_tip("mental health")}

    # Catch-all: context tip
    if req.mood:
        return {"msg": validate_tip(req.mood)}
    return {"msg": f"Hey {req.username or 'friend'}, I’m here to help with money stuff — what’s on your mind today? {select_emoji()}"}

@app.post("/start-checkin")
def checkin():
    return {"msg": checkin_question()}

@app.post("/get-challenge")
def get_challenge():
    return {"msg": challenge_prompt()}

@app.post("/funds-alert")
def funds_alert_api(budget: float, days: int):
    return {"msg": budget_alert(budget, days)}

@app.post("/wellness-tip")
def get_wellness_tip(context: Optional[str] = None):
    return {"msg": validate_tip(context)}

@app.post("/health-swap")
def healthswap():
    return {"msg": make_health_swap()}

# (Optional) More endpoints for reminders, streaks, gamified rewards, etc.

