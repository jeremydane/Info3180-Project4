""" main.py is the top level script.

Return "Hello World" at the root URL.
"""

import os
import sys

# sys.path includes 'server/lib' due to appengine_config.py
from flask import Flask, url_for
from flask import request
from flask import render_template
app = Flask(__name__.split('.')[0])

@app.route('/')
@app.route('/<name>')
def hello(name=None):
    return render_template('cards.html', name=name)

@app.route('/leaderBoard')
@app.route('/<name>')
def leader(name=None):
    return render_template('leaderBoard.html', name=name)


@app.route('/about')
@app.route('/<name>')
def about(name=None):
    return render_template('about.html', name=name)


@app.route('/login')
@app.route('/<name>')
def login(name=None):
    return render_template('login.html', name=name)


#@app.route('/login')#, methods=['POST', 'GET'])
#@app.route('/login/<name>')
#@app.route('/<name>')
#def login(name=None):
    #error = None
    #session['logged_in'] = True
    #flash('You were logged in')
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    #return render_template('login.html', name=name)

def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('cards'))

@app.errorhandler(404)
def page_not_found(e):
     return 'Sorry, Nothing at this URL.', 404
