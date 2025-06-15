import os

def lambda_handler(event, context):
    template_path = os.path.join(os.path.dirname(__file__), "TemplateLetter.txt")
    with open(template_path, "r") as f:
        template = f.read()

    replacements = {
        "{{track_title}}": event.get("track_metadata", {}).get("title", ""),
        "{{brand_or_game}}": event.get("brand_or_game", ""),
        "{{recipient_name_or_team}}": event.get("recipient_name_or_team", ""),
        "{{theme_bullets}}": "\n".join(event.get("theme_bullets", [])),
        "{{preview_link}}": event.get("preview_link", ""),
        "{{download_link}}": event.get("download_link", ""),
        "{{ascap_ipi_base}}": event.get("track_metadata", {}).get("ascap", {}).get("ipi_base_number", ""),
        "{{ascap_work_id}}": event.get("track_metadata", {}).get("ascap", {}).get("work_id", ""),
    }

    letter = template
    for k, v in replacements.items():
        letter = letter.replace(k, str(v))

    return {
        "statusCode": 200,
        "body": letter
    }
