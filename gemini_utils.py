from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def generate_response(prompt):
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )
    return response.text


if __name__ == "__main__":
    result = generate_response("Say hello to PocketSmart AI")
    print(result)