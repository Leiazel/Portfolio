import os
import ssl
import smtplib
import json
from email.message import EmailMessage
from dotenv import load_dotenv


def handler(request):
    if request.method != 'POST':
        return {'error': 'Method not allowed.'}, 405

    try:
        data = request.get_json() or {}
    except AttributeError:
        try:
            data = json.loads(request.data.decode('utf-8') or '{}')
        except Exception:
            data = {}
    except Exception:
        data = {}

    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()

    if not subject or not body:
        return {'error': 'Subject y body son requeridos.'}, 400

    load_dotenv()
    password = os.getenv('PASSWORD')
    if not password:
        return {'error': 'PASSWORD no configurado en variables de entorno.'}, 500

    email_sender = 'correos.fzdamian99@gmail.com'
    email_receiver = 'leiazel.412@gmail.com'

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, password)
        smtp.send_message(em)

    return {'message': 'Mensaje enviado correctamente.'}
