import boto3
import os

SES = boto3.client("ses")
TO_EMAIL = "ops@decodedmusic.com"
FROM_EMAIL = os.environ.get("FROM_EMAIL", "ops@decodedmusic.com")

def lambda_handler(event, context):
    import json
    body = event.get("body")
    if isinstance(body, str):
        body = json.loads(body)
    subject = f"Write with Rue de Vivre Submission: {body.get('projectTitle', '')}"
    body_text = f"""
Production Type: {body.get('productionType', '')}
Project / Episode Title: {body.get('projectTitle', '')}
Your Role & Company: {body.get('roleCompany', '')}
Project Synopsis: {body.get('synopsis', '')}
Why This Track?: {body.get('rationale', '')}
Usage Details: {body.get('usage', '')}
Deadline / Window: {body.get('deadline', '')}
Contact Name & Email: {body.get('contact', '')}
"""
    SES.send_email(
        Source=FROM_EMAIL,
        Destination={"ToAddresses": [TO_EMAIL]},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Text": {"Data": body_text}}
        }
    )
    return {"statusCode": 200, "body": "Submission received. We'll review and get back within 24 hours."}
