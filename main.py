from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from gemini_utils import generate_response


# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI(title="PocketSmart AI")


# ==========================================
# STATIC FILES
# ==========================================

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


# ==========================================
# REQUEST MODELS
# ==========================================

class ChatRequest(BaseModel):
    message: str


class HomeRequest(BaseModel):
    room_type: str
    budget: str
    style: str


class PartyRequest(BaseModel):
    party_type: str
    guests: str
    budget: str
    theme: str


class JewelryRequest(BaseModel):
    jewelry_type: str
    occasion: str
    budget: str
    material: str


# ==========================================
# HOME PAGE
# ==========================================

@app.get("/")
def home():
    return FileResponse("templates/index.html")


# ==========================================
# CHAT
# ==========================================

@app.post("/chat")
def chat(request: ChatRequest):

    response = generate_response(
        request.message
    )

    return {
        "response": response
    }


# ==========================================
# HOME INTERIOR PLANNER
# ==========================================

@app.post("/generate-home")
def generate_home(request: HomeRequest):

    prompt = f"""
I want a home interior recommendation.

Room type: {request.room_type}

Budget: ₹{request.budget}

Preferred style: {request.style}

Give me practical suggestions that fit
the budget.

Include:

- Furniture
- Colors
- Lighting
- Decor
- Budget-friendly ideas

Keep the recommendations realistic
for the given budget.

Use Indian prices in INR.
"""

    response = generate_response(prompt)

    return {
        "response": response
    }


# ==========================================
# PARTY PLANNER
# ==========================================

@app.post("/generate-party")
def generate_party(request: PartyRequest):

    prompt = f"""
I want a party planning recommendation.

Party type: {request.party_type}

Number of guests: {request.guests}

Budget: ₹{request.budget}

Theme: {request.theme}

Create a practical party plan that fits
the given budget.

Include:

- Food and drinks
- Decorations
- Venue ideas
- Entertainment
- Invitations
- Party supplies
- Budget allocation

Keep the recommendations realistic
for the given number of guests
and budget.

Use Indian prices in INR.
"""

    response = generate_response(prompt)

    return {
        "response": response
    }


# ==========================================
# JEWELRY PLANNER
# ==========================================

@app.post("/generate-jewelry")
def generate_jewelry(request: JewelryRequest):

    prompt = f"""
I want a jewelry recommendation.

Jewelry type: {request.jewelry_type}

Occasion: {request.occasion}

Budget: ₹{request.budget}

Preferred material: {request.material}

Give me practical jewelry suggestions
that fit the given budget.

Include:

- Suitable jewelry styles
- Material suggestions
- Design ideas
- Budget allocation
- Buying considerations
- Affordable alternatives

Keep the recommendations realistic
for the given budget.

Use Indian prices in INR.

Focus on the jewelry and budget,
not on judging the person's appearance.
"""

    response = generate_response(prompt)

    return {
        "response": response
    }