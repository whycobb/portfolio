from redmail import EmailSender
from redmail import gmail
import urllib.request

external_ip = urllib.request.urlopen('https://ident.me').read().decode('utf8')
print(external_ip)

message_text = "Pi server restarted! Public IP address is: "

gmail.username = 'yorickcdev@gmail.com'
gmail.password='ntfwfbsvrwpeieur'

email = EmailSender(host="smtp.gmail.com", port=587, username='yorickcdev@gmail.com', password='ntfw fbsv rwpe ieur')

gmail.send(
    subject="Testing - subject",
    receivers=['yorickcdev@gmail.com'],
    text=(message_text + external_ip)
)