from flask import Flask
from flask_redmail import RedMail

app = Flask(__name__)
app.config["EMAIL_HOST"] = "smtp.gmail.com"
app.config["EMAIL_PORT"] = 587
app.config["EMAIL_USERNAME"] = "dilara.tsch@gmail.com"
app.config["EMAIL_PASSWORD"] = "fyzbgxmusfnottnr"
# Set default sender
app.config["EMAIL_SENDER"] = "dilara.tsch@gmail.com"

email = RedMail()
email.init_app(app)

from app import routes