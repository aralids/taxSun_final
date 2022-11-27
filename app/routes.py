from flask import render_template, url_for, request, jsonify
from app import app
import taxopy

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/get_tax_data')
def get_tax_data():
    print("request.method: ", request.method)
    return jsonify(["Hello world!"])