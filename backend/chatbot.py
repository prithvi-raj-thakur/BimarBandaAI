# ===============================================================
#                      BIMARBANDAAI – V2 (Updated)
#         General medical assistant Flask backend (extended)
# ===============================================================
# Features:
# - General doctor-like assistant (symptom triage, remedies, OTC)
# - Emergency detection -> Twilio call (only if phone provided and Twilio configured)
# - Location-based hospital suggestions (Google Places)
# - Slang detection & polite warning
# - Irrelevant-question handling
# - Allows users to opt-out of sharing phone number and continue
# - Optional Gemini (multilingual) rephrasing if GEMINI_API_KEY is provided
# - Clear structure and comments for readability / printing
# ===============================================================

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re
import requests
from datetime import datetime
from typing import Tuple, Optional
from twilio.rest import Client



# Optional: Google Generative (Gemini) and Twilio are used only if configured
try:
    import google.generativeai as genai
except Exception:
    genai = None

try:
    from twilio.rest import Client
except Exception:
    Client = None

# -------------------------
# Load environment variables
# -------------------------
load_dotenv()

# -------------------------
# External API keys (optional)
# -------------------------
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")     # optional: if present, we can ask Gemini to rephrase replies in user's language
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")     # optional: geocoding & places
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")

# Configure Gemini if available
if GEMINI_API_KEY and genai:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        print("Warning: failed to configure Gemini:", e)

# Configure Twilio client (optional)
twilio_client: Optional[Client] = None
if TWILIO_SID and TWILIO_AUTH and Client:
    try:
        twilio_client = Client(TWILIO_SID, TWILIO_AUTH)
    except Exception as e:
        print("Warning: Twilio init failed:", e)
        twilio_client = None

# -------------------------
# Flask app & CORS
# -------------------------
app = Flask(__name__)
# In development allow all origins. Restrict this in production.
CORS(app, resources={r"/*": {"origins": "*"}})


# ---------------------------------------------------------
# In-memory session store (demo). Replace with DB in production.
# ---------------------------------------------------------
session_data = {}

# ---------------------------------------------------------
# Keywords and lists
# ---------------------------------------------------------
EMERGENCY_KEYWORDS = [
    "suicide", "kill myself", "want to die", "end my life",
    "self harm", "cut myself", "not waking up",
    "die", "death", "goodbye forever", "im going to kill myself",
    "i will kill myself", "i'm going to die", "hurt myself"
]

SLANG_WORDS = [
    "fuck", "f*", "shit", "s*t", "bastard", "b*", "asshole", "ass",
    "cunt", "dick", "bollocks", 
]

NON_MEDICAL_KEYWORDS = [
    "movie", "song", "lyrics", "math", "solve", "programming", "coding",
    "movie review", "who is", "celebrity", "cricket", "football", "stock",
    "stock price", "bitcoin", "recipe"
]

PHONE_OPTOUT_KEYWORDS = [
    "no", "not now", "don't want", "do not want", "prefer not", "prefer not to",
    "skip", "skip phone", "no phone", "dont want", "do not share"
]

# ---------------------------------------------------------
# Helper functions
# ---------------------------------------------------------
def detect_emergency(message: str) -> bool:
    msg = message.lower()
    return any(kw in msg for kw in EMERGENCY_KEYWORDS)

def censor_slang(message: str) -> Tuple[bool, str]:
    """
    Detect and lightly censor slang. Returns (found_flag, censored_text).
    Keeps first char, rest replaced by asterisks.
    """
    lowered = message.lower()
    found = False
    censored = message
    for w in SLANG_WORDS:
        pattern_text = w.replace("*", "")
        pattern = re.compile(r"\b" + re.escape(pattern_text) + r"\b", re.IGNORECASE)
        if pattern.search(lowered):
            found = True
            def repl(m):
                s = m.group(0)
                return s[0] + "*" * (len(s) - 1)
            censored = pattern.sub(repl, censored)
    return found, censored

def detect_non_medical(message: str) -> bool:
    msg = message.lower()
    return any(kw in msg for kw in NON_MEDICAL_KEYWORDS)

def detect_phone_opt_out(message: str) -> bool:
    msg = message.lower()
    return any(phrase in msg for phrase in PHONE_OPTOUT_KEYWORDS)

def make_emergency_call(phone: str) -> bool:
    """Place an emergency call using Twilio (if configured)."""
    if not twilio_client or not TWILIO_NUMBER:
        print("Twilio not configured; cannot place emergency call.")
        return False
    try:
        twilio_client.calls.create(
            to=phone,
            from_=TWILIO_NUMBER,
            twiml=(
                "<Response>"
                    "<Say voice='alice'>"
                        "Hi, this is Bimar Banda AI checking in with you. "
                        "I want you to know something important. "
                        "Whatever you are going through right now, your life still has value. "
                        "You matter, and you are not alone. "
                        "Please take a deep breath. "
                        "If you feel unsafe or overwhelmed, "
                        "please call your local emergency number or talk to someone you trust. "
                        "You deserve help and support. "
                        "You are stronger than you think, and your story is not over."
                    "</Say>"
                "</Response>"
            )
        )

        return True
    except Exception as e:
        print("Emergency call error:", e)
        return False

# ---------------------------------------------------------
# Simple rule-based symptom analyzer (deterministic)
# ---------------------------------------------------------
def analyze_symptoms(message: str):
    msg = message.lower()
    probable = []
    tips = []
    meds = []

    if any(w in msg for w in ["fever", "temperature", "hot", "chills"]):
        probable.append("Fever — could be viral or bacterial infection, or heat-related.")
        tips.extend([
            "Rest and hydrate (water, ORS if needed).",
            "Use a thermometer to monitor temperature.",
            "Avoid overly cold drinks if you have chills."
        ])
        meds.append("Paracetamol 500 mg (OTC) — follow pack directions.")

    if any(w in msg for w in ["cough", "sore throat", "throat pain", "hoarse"]):
        probable.append("Upper respiratory tract infection (common cold) or throat irritation.")
        tips.extend([
            "Warm saline gargles and steam inhalation.",
            "Stay hydrated and avoid smoke/pollution exposure."
        ])
        meds.append("Cough syrup or lozenges for symptomatic relief (ask pharmacist).")

    if any(w in msg for w in ["stomach", "stomachache", "abdominal", "nausea", "vomit", "diarrhea"]):
        probable.append("Gastrointestinal upset — possible food poisoning, gastritis or viral gastroenteritis.")
        tips.extend([
            "Drink ORS and clear fluids; avoid heavy/fatty meals for 24-48 hours.",
            "Seek urgent care if severe dehydration, high fever or blood in stool."
        ])
        meds.append("ORS; antiemetic if prescribed by a doctor.")

    if any(w in msg for w in ["headache", "migraine", "head pain"]):
        probable.append("Headache — causes include tension, migraine, dehydration, or eye strain.")
        tips.extend([
            "Check hydration and rest in a quiet, dark room if it's a migraine.",
            "Try cold/hot compress depending on preference."
        ])
        meds.append("Paracetamol or ibuprofen (if no contraindication).")

    if any(w in msg for w in ["skin", "rash", "itch", "red spots"]):
        probable.append("Skin reaction — could be allergic, contact dermatitis, or infection.")
        tips.extend([
            "Keep the area clean and dry; avoid scratching.",
            "Use gentle soap and avoid suspected irritants."
        ])
        meds.append("Topical hydrocortisone for mild itch (OTC) — consult if spreading.")

    if any(w in msg for w in ["period", "menstrual", "cramps", "dysmenorrhea"]):
        probable.append("Menstrual cramps (dysmenorrhea).")
        tips.extend([
            "Use a heat pad and light exercise; rest when needed.",
            "Stay hydrated and avoid heavy meals if in pain."
        ])
        meds.append("Ibuprofen or mefenamic acid as per guidance; consult doctor for heavy bleeding or severe pain.")

    if not probable:
        probable.append("Symptoms not specific from the message. More details (duration, severity, other symptoms) will help.")
        tips.append("Please share duration, severity, and any associated symptoms (fever, vomiting, breathing difficulty).")

    # deduplicate while preserving order
    def unique(seq):
        seen = set()
        out = []
        for s in seq:
            if s not in seen:
                out.append(s)
                seen.add(s)
        return out

    return unique(probable), unique(tips), unique(meds)

# ---------------------------------------------------------
# Explain medicine / term (short)
# ---------------------------------------------------------
def explain_use_of(term: str) -> str:
    t = term.lower()
    explanations = {
        "paracetamol": "Paracetamol: reduces fever and relieves mild to moderate pain. Do not exceed the recommended dose.",
        "ibuprofen": "Ibuprofen: NSAID for pain and inflammation. Take with food; avoid if you have stomach ulcers or certain conditions.",
        "dolo": "Dolo (paracetamol brand): used for fever and pain relief.",
        "ors": "ORS: oral rehydration solution that replenishes salts and water lost in diarrhea/vomiting.",
        "cetirizine": "Cetirizine: an antihistamine for allergy symptoms like runny nose and hives."
    }
    for k, v in explanations.items():
        if k in t:
            return v
    return f"{term}: This is a commonly used medicine or medical term. Consult a healthcare professional or pharmacist for exact purpose and dosing."

# ---------------------------------------------------------
# Geocoding & Places (requires GOOGLE_API_KEY)
# ---------------------------------------------------------
def geocode_location(location_text: str):
    """Return lat, lng, formatted_address or (None, None, None). Uses Google API if available, else Gemini."""
    # Try Google API first if key is available
    if GOOGLE_API_KEY:
        url = "https://maps.googleapis.com/maps/api/geocode/json"
        params = {"address": location_text, "key": GOOGLE_API_KEY}
        try:
            resp = requests.get(url, params=params, timeout=8)
            data = resp.json()
            if data.get("status") == "OK" and data.get("results"):
                r = data["results"][0]
                loc = r["geometry"]["location"]
                return loc.get("lat"), loc.get("lng"), r.get("formatted_address")
        except Exception as e:
            print("Google Geocode error:", e)
    
    # Fallback to Gemini if Google API not available or failed
    if GEMINI_API_KEY and genai:
        try:
            model = genai.GenerativeModel(model_name="gemini-2.0-flash")
            prompt = f"""
You are a geocoding assistant. Given the location name "{location_text}", provide:
1. Approximate latitude (decimal format, e.g., 28.6139)
2. Approximate longitude (decimal format, e.g., 77.2090)
3. Full location name/address

Format your response EXACTLY as:
LAT: [latitude]
LNG: [longitude]
ADDRESS: [full address]

Be accurate and concise.
"""
            response = model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Parse the response
            lat, lng, addr = None, None, None
            for line in result_text.split('\n'):
                if line.startswith('LAT:'):
                    try:
                        lat = float(line.replace('LAT:', '').strip())
                    except:
                        pass
                elif line.startswith('LNG:'):
                    try:
                        lng = float(line.replace('LNG:', '').strip())
                    except:
                        pass
                elif line.startswith('ADDRESS:'):
                    addr = line.replace('ADDRESS:', '').strip()
            
            if lat is not None and lng is not None:
                return lat, lng, addr or location_text
        except Exception as e:
            print("Gemini Geocode error:", e)
    
    return None, None, None

def find_nearby_hospitals(lat: float, lng: float, radius=5000, limit=5):
    """Return list of nearby hospitals using Gemini AI (if available)."""
    if not GEMINI_API_KEY or not genai or lat is None or lng is None:
        return []
    
    try:
        model = genai.GenerativeModel(model_name="gemini-2.0-flash")
        prompt = f"""
You are a helpful assistant. Based on coordinates (latitude: {lat}, longitude: {lng}), 
suggest approximately {limit} well-known hospitals or medical centers in that area.

Format your response as a simple list with:
- Hospital name
- Approximate area/address
- Any notable services (if known)

Be concise and practical. Focus on major hospitals that are likely to exist in that region.
"""
        response = model.generate_content(prompt)
        hospitals_text = response.text.strip()
        
        # Parse the response into structured format
        results = []
        lines = hospitals_text.split('\n')
        current_hospital = {}
        
        for line in lines:
            line = line.strip()
            if not line:
                if current_hospital:
                    results.append(current_hospital)
                    current_hospital = {}
                continue
            
            # Try to extract hospital info from each line
            if line and not line.startswith('-'):
                if current_hospital:
                    results.append(current_hospital)
                current_hospital = {"name": line.split('-')[0].strip() if '-' in line else line}
            elif line.startswith('-'):
                # Additional info for current hospital
                if not current_hospital:
                    current_hospital = {"name": "Hospital"}
                if "address" not in current_hospital:
                    current_hospital["address"] = line[1:].strip()
                elif "services" not in current_hospital:
                    current_hospital["services"] = line[1:].strip()
        
        if current_hospital:
            results.append(current_hospital)
        
        return results[:limit]
    
    except Exception as e:
        print("Gemini hospital suggestion error:", e)
        return []



# ---------------------------------------------------------
# Build reply helper: assemble short blocks + disclaimer
# ---------------------------------------------------------
def build_reply(blocks):
    disclaimer = "\n\n🔔 Disclaimer: This is general information, not a medical diagnosis. Consult a real doctor for medical advice."
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    header = f"🩺 BimarBandaAI — {now}\n"
    content = "\n\n".join(blocks)
    return header + content + disclaimer

# ---------------------------------------------------------
# Optional: multilingual Gemini rephrase (if GEMINI_API_KEY enabled)
# We'll pass the draft reply and ask Gemini to rephrase in user's language
# (This is optional and used only if genai is configured.)
# ---------------------------------------------------------
def rephrase_with_gemini(draft_reply: str, user_language_hint: Optional[str] = None) -> str:
    """
    If Gemini is configured, ask it to rephrase the draft reply in the user's language.
    user_language_hint can be 'hi' for Hindi, 'bn' for Bengali, etc. If None, Gemini will infer.
    """
    if not GEMINI_API_KEY or not genai:
        return draft_reply
    try:
        system_instruction = f"""
You are BimarBandaAI, a compassionate multilingual medical assistant.
Instructions:
- Rephrase the user's reply below into a short, friendly, and clear response.
- Keep the content medically cautious. Do NOT add new medical claims.
- Always end with the disclaimer: This is general information, not a medical diagnosis.
- Ask the location from the user after anking the number in format : my location is [city name or lat,lng].
- suggest hospitals and clinics and if someone asks for medicine suggest common otc medicines only.
- If user_language_hint is provided, respond in that language; else infer from user's previous messages
- if user asks about any specific hospital then provide the rating and address of that hospital.
- ask for which langauage the user wants the response . if not specified , use english.
- you are allowed to use emojis and reply in small texts and send multipe replies but dont answer i paragraphs.
- Use simple language suitable for general public.
"""
        # Generate a simple rephrase (using the lightweight flash model)
        model = genai.GenerativeModel(model_name="gemini-2.0-flash", system_instruction=system_instruction)
        response = model.generate_content([{"role": "user", "parts": draft_reply}])
        return response.text.strip() or draft_reply
    except Exception as e:
        print("Gemini rephrase error:", e)
        return draft_reply

# ===============================================================
# Main chat endpoint
# ===============================================================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json or {}
    session_id = data.get("session_id")
    user_message = (data.get("message") or "").strip()

    if not session_id:
        return jsonify({"error": "session_id required"}), 400
    if not user_message:
        return jsonify({"error": "message required"}), 400

    # Initialize session record
    if session_id not in session_data:
        session_data[session_id] = {"phone": None, "phone_opt_out": False, "history": [], "location": None}

    user = session_data[session_id]

    # -------------------------
    # If phone not set: request, accept number, or allow opt-out
    # -------------------------
    if user["phone"] is None and not user["phone_opt_out"]:
        digits_only = re.sub(r"\D", "", user_message)
        if user_message.startswith("+") and len(digits_only) >= 10:
            user["phone"] = user_message
            user["history"].append({"role": "system", "parts": "User provided phone number"})
            welcome_blocks = [
                "❤ Welcome to BimarBandaAI! Your phone number is saved for safety.",
                "✨ “Small steps of care can make a big difference.”",
                "I can suggest possible causes, general home remedies, common OTC medicines, and nearby hospitals.",
                "I will always remind you to consult a real doctor for diagnosis or prescription.",
                "Now — how can I help you today? (Tell me your symptoms or type 'help' for examples.)"
            ]
            return jsonify({"reply": build_reply(welcome_blocks)})
        elif len(digits_only) >= 10 and not user_message.startswith("+"):
            user["phone"] = digits_only
            user["history"].append({"role": "system", "parts": "User provided phone number (digits)"})
            welcome_blocks = [
                "❤ Welcome to BimarBandaAI! Your phone number is saved for safety.",
                "✨ “Small steps of care can make a big difference.”",
                "I can suggest possible causes, general home remedies, common OTC medicines, and nearby hospitals.",
                "I will always remind you to consult a real doctor for diagnosis or prescription.",
                "Now — how can I help you today? (Tell me your symptoms or type 'help' for examples.)"
            ]
            return jsonify({"reply": build_reply(welcome_blocks)})
        elif detect_phone_opt_out(user_message):
            user["phone_opt_out"] = True
            user["history"].append({"role": "system", "parts": "User opted out of sharing phone"})
            blocks = [
                "🌼 That's okay — you can continue without sharing your phone number.",
                "Note: Without a phone number, we won't be able to call you if an emergency is detected. Please seek local emergency help if needed.",
                "How can I help you today? Describe your symptoms or ask a question."
            ]
            return jsonify({"reply": build_reply(blocks)})
        else:
            return jsonify({"reply": (
                "🌼 Please enter your phone number first (for safety features):\n"
                "Format → +91XXXXXXXXXX\n\nIf you prefer not to share, say 'no' or 'skip' and we'll continue without it."
            )})

    # -------------------------
    # Censor slang & store sanitized message in history
    # -------------------------
    slang_found, censored_message = censor_slang(user_message)
    if slang_found:
        user["history"].append({"role": "user", "parts": censored_message})
    else:
        user["history"].append({"role": "user", "parts": user_message})

    # -------------------------
    # Emergency detection
    # -------------------------
    if detect_emergency(user_message):
        if user.get("phone") and twilio_client:
            called = make_emergency_call(user["phone"])
            if called:
                return jsonify({"reply": build_reply(["⚠ Emergency detected! We have placed an emergency call to your number. Please seek immediate help."])})
            else:
                return jsonify({"reply": build_reply(["⚠ Emergency detected! I tried to call but was unable. Please contact emergency services immediately."])})
        else:
            return jsonify({"reply": build_reply(["⚠ Emergency language detected! We cannot place a call (no phone on file or Twilio not configured). Please contact local emergency services immediately."])})

    # -------------------------
    # Non-medical / irrelevant detection
    # -------------------------
    if detect_non_medical(user_message):
        return jsonify({"reply": build_reply(["My name is BimarBandaAI. I am not trained in this field."])})

    # -------------------------
    # Location parsing (city or lat,lng)
    # -------------------------
    if re.search(r"\b(location|i am in|i'm in|my city|my location|located at|here is)\b", user_message.lower()):
        coord_match = re.search(r"(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)", user_message)
        if coord_match:
            try:
                lat = float(coord_match.group(1)); lng = float(coord_match.group(2))
                user["location"] = {"text": f"{lat},{lng}", "lat": lat, "lng": lng}
            except Exception:
                user["location"] = None
        else:
            place_text_match = re.search(r"(?:in|at|location is|here is)\s+(.+)", user_message, re.IGNORECASE)
            place_text = place_text_match.group(1).strip() if place_text_match else user_message
            g_lat, g_lng, addr = geocode_location(place_text)
            if g_lat and g_lng:
                user["location"] = {"text": addr or place_text, "lat": g_lat, "lng": g_lng}

        if user.get("location"):
            blocks = [f"📍 Location saved: {user['location']['text']}"]
            blocks.append("How can I assist you now? Describe your symptoms in short (e.g., 'fever and cough 2 days').")
            return jsonify({"reply": build_reply(blocks)})
        else:
            return jsonify({"reply": build_reply(["I couldn't identify that location. Please send a clear city or 'City, Country' or lat,lng."])})

    # -------------------------
    # If user asks "what is the use of X" or similar
    # -------------------------
    m_use = re.search(r"\bwhat is the use of\s+(.+)|\bwhat does\s+(.+)\s+do\b", user_message.lower())
    if m_use:
        term = m_use.group(1) or m_use.group(2)
        if term:
            term = term.strip().strip("?")
            explanation = explain_use_of(term)
            blocks = [f"🔎 About: {term}", f"• {explanation}"]
            return jsonify({"reply": build_reply(blocks)})

    # -------------------------
    # Main symptom analysis & reply building
    # -------------------------
    probable, tips, meds = analyze_symptoms(user_message)

    hospital_blocks = []
    if user.get("location") and user["location"].get("lat") and user["location"].get("lng"):
        hlist = find_nearby_hospitals(user["location"]["lat"], user["location"]["lng"])
        if hlist:
            hospital_blocks.append("🏥 Nearby hospitals / clinics:")
            for h in hlist:
                line = f"• {h.get('name')}"
                if h.get("address"):
                    line += f" — {h.get('address')}"
                elif h.get("vicinity"):
                    line += f" — {h.get('vicinity')}"
                if h.get("phone"):
                    line += f" | 📞 {h.get('phone')}"
                hospital_blocks.append(line)
        else:
            hospital_blocks.append("🏥 No nearby hospitals found via API. Please share your city / pin code for manual suggestions.")

    blocks = []
    blocks.append("🔍 Possible causes (based on what you told me):")
    for p in probable:
        blocks.append(f"• {p}")

    if tips:
        blocks.append("🛠 General remedies / tips:")
        for t in tips[:6]:
            blocks.append(f"• {t}")

    if meds:
        blocks.append("💊 Commonly used (OTC) medicines to discuss with a pharmacist/doctor:")
        for m in meds[:6]:
            blocks.append(f"• {m}")

    blocks.append("❗ Do you have severe symptoms (difficulty breathing, chest pain, fainting, uncontrolled bleeding)? Reply 'yes' if urgent.")

    if hospital_blocks:
        blocks.extend(hospital_blocks)

    if slang_found:
        blocks.append("🚫 Note: I censored some words in your message. Please avoid abusive language so I can help better.")

    if user.get("phone_opt_out") and not user.get("phone"):
        blocks.append("📌 You chose not to share a phone number — we won't be able to call you in an emergency. Please seek local help if needed.")

    if not user.get("location"):
        blocks.append("📍 Tip: Share your location (city or 'City, Country' or lat,lng) so I can suggest nearby hospitals if you want.")

    blocks.append("❤ You're not alone — small steps of care help. Tell me more or say 'call' if you need urgent help.")

    draft_reply = build_reply(blocks)

    # Optionally rephrase with Gemini to match user's language (if configured)
    final_reply = rephrase_with_gemini(draft_reply) if (GEMINI_API_KEY and genai) else draft_reply

    user["history"].append({"role": "model", "parts": final_reply})
    return jsonify({"reply": final_reply})

# ---------------------------------------------------------
# Health-check / root
# ---------------------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "BimarBandaAI Flask API — General Assistant (Emergency calls enabled if configured)."})

# ---------------------------------------------------------
# Run server
# ---------------------------------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render will inject PORT
    print(f"Starting backend on port {port}…")
    app.run(host="0.0.0.0", port=port)
