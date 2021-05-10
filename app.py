from flask import Flask, request, render_template
import requests
import smtplib

import emailFunc


app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def main():

    # POST methods

    if request.method == "POST":
    
        name = request.json['name']
        email = request.json['email']
        message = request.json['message']
        
        emailFunc.send_email(name, email, message)
        
        return render_template("index.html") 
    # GET methods

    else:
        return render_template("index.html")

@app.route('/projects')
def projects():
    return render_template("projects.html")


if __name__ == '__main__':
    app.run()