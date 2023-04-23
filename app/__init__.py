from flask import Flask
from flask_redmail import RedMail

app = Flask(__name__)

from app import routes