import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)

print("--- Verifying 'diabetes' Test Data ---")

# 1. Check Test
try:
    test = supabase.table("tests").select("*").eq("id", "diabetes").execute()
    if test.data:
        print(f"[OK] Test found: {test.data[0]['title']}")
    else:
        print("[FAIL] Test 'diabetes' not found.")
except Exception as e:
    print(f"[ERROR] Checking test: {e}")

# 2. Check Questions
try:
    questions = supabase.table("questions").select("*").eq("test_id", "diabetes").execute()
    count = len(questions.data)
    print(f"[INFO] Questions found: {count}")
    if count == 20:
        print("[OK] All 20 questions are present.")
    else:
        print(f"[FAIL] Expected 20 questions, found {count}.")
except Exception as e:
    print(f"[ERROR] Checking questions: {e}")
