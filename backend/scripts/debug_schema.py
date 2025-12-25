import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)

print("Fetching one text from 'tests'...")
try:
    response = supabase.table("tests").select("*").limit(1).execute()
    data = response.data
    if data:
        print("Columns found:", data[0].keys())
    else:
        print("Table is empty, cannot infer columns easily via select *.")
except Exception as e:
    print("Error:", e)
