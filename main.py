import os
from flask import Flask, request, jsonify
from usecase.sendMail import send_Mail

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json(silent=True) or {}
    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()

    if not subject or not body:
        return jsonify({'error': 'Subject y body son requeridos.'}), 400

    try:
        send_Mail(subject, body)
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500

    return jsonify({'message': 'Mensaje enviado correctamente.'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
