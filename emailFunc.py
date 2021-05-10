import requests
import os

def send_email(name, email, message):
    
    domain = os.environ["MAILGUN_DOMAIN"]
    api_key = os.environ["MAILGUN_API_KEY"]
    
    recipient = os.environ["MY_EMAIL"]
    return requests.post(
        f"https://api.mailgun.net/v3/{domain}/messages",
		auth=("api", f"{api_key}"),
		data={
            "from": f"{email}",
			"to": [f"{recipient}"],
			"subject": f"Message From Website: {name}",
			"text": f"{message}"}
  )
    
    
    
