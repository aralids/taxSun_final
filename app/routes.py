from flask import render_template
from app import app
import taxopy

@app.route('/index')
def index():
    return render_template('index.html')