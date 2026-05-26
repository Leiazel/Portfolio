import os, ssl, smtplib
from dotenv import load_dotenv
from email.message import EmailMessage

def send_Mail(subject, body):
    load_dotenv()
    email_sender= "correos.fzdamian99@gmail.com"
    password = os.getenv("PASSWORD")
    email_receiver = "leiazel.412@gmail.com"

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)    

    context = ssl.create_default_context() 

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())