import os
import ssl
import json
import smtplib
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            data = json.loads(raw_body.decode('utf-8')) if raw_body else {}
        except Exception:
            data = {}

        subject = (data.get('subject') or '').strip()
        body    = (data.get('body')    or '').strip()

        if not subject or not body:
            self._respond(400, {'error': 'Subject y body son requeridos.'})
            return

        password = os.environ.get('PASSWORD', '')
        if not password:
            self._respond(500, {'error': 'PASSWORD no configurado en variables de entorno.'})
            return

        try:
            email_sender   = 'correos.fzdamian99@gmail.com'
            email_receiver = 'leiazel.412@gmail.com'

            em = EmailMessage()
            em['From']    = email_sender
            em['To']      = email_receiver
            em['Subject'] = subject
            em.set_content(body)

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                smtp.login(email_sender, password)
                smtp.send_message(em)

            self._respond(200, {'message': 'Mensaje enviado correctamente.'})

        except smtplib.SMTPAuthenticationError:
            self._respond(500, {'error': 'Error de autenticación SMTP. Verificá la contraseña de aplicación.'})
        except Exception as exc:
            self._respond(500, {'error': f'Error al enviar el mail: {str(exc)}'})

    def _respond(self, status: int, payload: dict):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)
