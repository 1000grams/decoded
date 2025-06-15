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
    subject = f"Contact Form Submission from {body.get('name', '')}"
    body_text = f"Name: {body.get('name', '')}\nEmail: {body.get('email', '')}\nMessage:\n{body.get('message', '')}"
    SES.send_email(
        Source=FROM_EMAIL,
        Destination={"ToAddresses": [TO_EMAIL]},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Text": {"Data": body_text}}
        }
    )
    return {"statusCode": 200, "body": "Message sent."}
