from services.db_supabase import init_db, db
import os
from dotenv import load_dotenv

# Load env manually just in case
load_dotenv()

print(f"Testing Supabase Connection...")
print(f"URL: {os.getenv('SUPABASE_URL')}")
# Don't print the full key for security
key = os.getenv('SUPABASE_KEY')
print(f"KEY: {key[:5]}..." if key else "KEY: None")

try:
    init_db()
    
    # Try to fetch tests
    print("\nAttempting to fetch 'tests' table...")
    from services.db_supabase import db
    tests = db.get_all_tests()
    
    if tests is not None:
        print(f"SUCCESS! Retrieved {len(tests)} tests.")
        for t in tests:
            print(f"- {t.get('title')} ({t.get('id')})")
    else:
        print("FAILED to retrieve tests (returned None).")

except Exception as e:
    print(f"\nCRITICAL ERROR: {e}")
