RESPONSES = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hey! What can I do for you?",
    "help": "I can answer basic questions. Try asking about hours, pricing, or contact info.",
    "hours": "We are open Monday to Friday, 9am to 5pm.",
    "price": "Our pricing starts at $9/month. Visit our website for more details.",
    "pricing": "Our pricing starts at $9/month. Visit our website for more details.",
    "contact": "You can reach us at support@chatbot-poc.com.",
    "bye": "Goodbye! Have a great day!",
    "thanks": "You're welcome! Let me know if you need anything else.",
    "thank you": "You're welcome! Let me know if you need anything else.",
}

FALLBACK = "Sorry, I didn't understand that. Try asking about hours, pricing, or contact info."


def get_bot_reply(text: str) -> str:
    cleaned = text.lower().strip()

    for keyword, response in RESPONSES.items():
        if keyword in cleaned:
            return response

    return FALLBACK
