# verify_env.py
# Verifies that required API URLs are present in the .env file

REQUIRED_KEYS = [
    "REACT_APP_BACKEND_API=https://d340ynz7yytwls.cloudfront.net/backend",
    "REACT_APP_PITCH_API=https://d340ynz7yytwls.cloudfront.net/pitch",
    "REACT_APP_DASHBOARD_API=https://d340ynz7yytwls.cloudfront.net/dashboard"
]

def main():
    with open('.env', 'r') as f:
        env_lines = [line.strip() for line in f if line.strip() and not line.strip().startswith('#')]
    missing = [key for key in REQUIRED_KEYS if key not in env_lines]
    if not missing:
        print("✅ All required API URLs are present in .env")
    else:
        print("❌ Missing the following lines in .env:")
        for key in missing:
            print(f"  {key}")

if __name__ == "__main__":
    main()
