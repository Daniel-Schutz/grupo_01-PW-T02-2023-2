import json

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


smtp_server = 'smtp.gmail.com'
smtp_port = 587  
smtp_username = 'ap_inbox@doxci.ai'
smtp_password = 'Aut0n0m!!'


sender = 'ap_inbox@doxci.ai'
to = 'issac@doxci.ai'  
#actually send to: dwf-cyber@britinsurance.com 
msg = MIMEMultipart()
msg['From'] = sender
msg['To'] = to

reference_to_renew = True

if reference_to_renew == True:
    msg['Subject'] = 'ACTION - RENEW REF - GH100F22A000'
    message = 'Please renew reference and attach email/attachments to DMS'
    
else:
    msg['Subject'] = 'ACTION - CREATE REF'
    message = f'message'
    
msg.attach(MIMEText(message, 'plain'))


try:
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  

   
    server.login(smtp_username, smtp_password)

   
    server.sendmail(sender, to, msg.as_string())

    server.quit()

    print('Email sent!')
except Exception as e:
    print('Email not sent:', str(e))
