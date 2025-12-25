import os
import json
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or "your_" in url:
    print("Error: Invalid Supabase Credentials in .env")
    exit(1)

supabase = create_client(url, key)

print("--- Initializing Data Injection ---")

# 1. Upsert 'diabetes' Test
print("Upserting Test: 'diabetes'...")
test_data = {
    "id": "diabetes",
    "title": "Type 2 Diabetes Risk Test",
    "description": "Based on clinical symptoms and lifestyle habits. Screen for pre-diabetes risks.",
    "is_active": True
    # "icon": "🩸", # Column missing
    # "theme_color": "#2563eb" # Column missing
}
try:
    supabase.table("tests").upsert(test_data).execute()
    print("Success: Test upserted.")
except Exception as e:
    print(f"Error upserting test: {e}")
    exit(1)

# 2. Prepare Questions
questions = [
  { "q_order": 1, "text": "Do you often feel thirsty even after drinking water?", "options": ["No", "Sometimes", "Often", "Always thirsty"], "scores": [0, 2, 3, 5] },
  { "q_order": 2, "text": "Do you urinate more than 8 times a day, or wake up to use the bathroom?", "options": ["No", "Slightly increased", "Often", "Wake up during sleep"], "scores": [0, 2, 3, 5] },
  { "q_order": 3, "text": "Do you experience uncontrollable drowsiness after meals?", "options": ["No", "Sometimes", "Often", "Every meal"], "scores": [0, 2, 3, 4] },
  { "q_order": 4, "text": "Have you lost weight rapidly without dieting?", "options": ["No change", "Slight decrease", "Noticeable decrease", "Rapid weight loss"], "scores": [0, 2, 4, 5] },
  { "q_order": 5, "text": "Does anyone in your immediate family (parents, siblings) have diabetes?", "options": ["None", "Not sure", "One person", "Two or more"], "scores": [0, 1, 3, 5] },
  { "q_order": 6, "text": "Do you mainly eat refined carbohydrates (white rice, noodles, bread)?", "options": ["Whole grains mainly", "Mixed", "Noodles/Bread 5+ times/week", "Almost every meal"], "scores": [0, 2, 4, 5] },
  { "q_order": 7, "text": "Do your wounds heal slower than before?", "options": ["Same", "Slightly slower", "Noticeably slower", "Does not heal well"], "scores": [0, 2, 3, 5] },
  { "q_order": 8, "text": "Do you sleep less than 6 hours a day or have irregular sleep patterns?", "options": ["Regular", "Sometimes irregular", "Often irregular", "Very insufficient"], "scores": [0, 2, 3, 4] },
  { "q_order": 9, "text": "Do you feel numbness or tingling in your hands or feet?", "options": ["No", "Sometimes", "Often", "Daily"], "scores": [0, 2, 3, 5] },
  { "q_order": 10, "text": "Do you consider yourself to have abdominal obesity?", "options": ["No", "A little", "Considerable", "Severe"], "scores": [0, 2, 3, 5] },
  { "q_order": 11, "text": "Is your vision blurry or dim recently?", "options": ["No", "Sometimes", "Often", "Persistent"], "scores": [0, 2, 3, 5] },
  { "q_order": 12, "text": "How often do you exercise (sweating for 30+ mins) per week?", "options": ["3+ times", "1-2 times", "Rarely", "Never"], "scores": [0, 2, 4, 5] },
  { "q_order": 13, "text": "Do you feel hungry or crave sweets shortly after eating?", "options": ["No", "Sometimes", "Often", "Always"], "scores": [0, 2, 3, 4] },
  { "q_order": 14, "text": "Are you taking medication for high blood pressure or high cholesterol?", "options": ["None", "Borderline", "Have one", "Have both"], "scores": [0, 2, 3, 5] },
  { "q_order": 15, "text": "Do you feel extreme stress or fatigue recently?", "options": ["Fine", "Sometimes", "Often", "Always"], "scores": [0, 1, 3, 4] },
  { "q_order": 16, "text": "How often do you eat late at night (after 10 PM)?", "options": ["Never", "Once a week", "2-3 times/week", "Almost daily"], "scores": [0, 2, 3, 5] },
  { "q_order": 17, "text": "How often do you consume alcohol?", "options": ["None", "1-2 times/month", "1-2 times/week", "3+ times/week"], "scores": [0, 1, 2, 4] },
  { "q_order": 18, "text": "Do you feel chronic lethargy or full-body fatigue?", "options": ["No", "Sometimes", "Often", "Always"], "scores": [0, 2, 3, 4] },
  { "q_order": 19, "text": "Do you have dry skin or itching?", "options": ["No", "Sometimes", "Often", "Severe"], "scores": [0, 1, 2, 3] },
  { "q_order": 20, "text": "What is your age group?", "options": ["Under 30", "40s", "50s", "Over 60"], "scores": [0, 2, 3, 4] }
]

# 3. Clear Existing Questions for this Test
print("Clearing old questions...")
supabase.table("questions").delete().eq("test_id", "diabetes").execute()

# 4. Insert New Questions
print(f"Inserting {len(questions)} questions...")
for q in questions:
    q_data = {
        "test_id": "diabetes",
        "q_order": q["q_order"],
        "question_text": q["text"],
        "options": q["options"],
        "scores": q["scores"]
    }
    supabase.table("questions").insert(q_data).execute()

print("--- Data Injection Complete ---")
