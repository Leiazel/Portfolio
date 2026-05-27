import os
import ssl
import smtplib
import json
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import Flask, request as flask_request, jsonify


app = Flask(__name__)


def send_contact_email(subject, body):
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

    return {'message': 'Mensaje enviado correctamente.'}, 200


@app.route('/', methods=['POST'])
def contact_route():
    if flask_request.method != 'POST':
        return jsonify({'error': 'Method not allowed.'}), 405

    data = flask_request.get_json(silent=True) or {}
    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()

    if not subject or not body:
        return jsonify({'error': 'Subject y body son requeridos.'}), 400

    resp, status = send_contact_email(subject, body)
    return jsonify(resp), status


# Keep a top-level handler for Vercel's function detection
def handler(request):
    if getattr(request, 'method', None) != 'POST':
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

    resp, status = send_contact_email(subject, body)
    return resp, status
