import os
import json
import requests
import datetime
from urllib.parse import urlparse

from flask import jsonify
from flask import Flask

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page
    @app.route('/hello')
    def hello():

        response = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
        data = response.json()
        finaldata = []

        for i in range(0,60):
            topstory = str(data[i])
            response2 = requests.get("https://hacker-news.firebaseio.com/v0/item/"+topstory+".json?print=pretty")
            finaldata.append(response2.json())

        for i in range (0,60):
            postdate = datetime.datetime.utcfromtimestamp(finaldata[i]['time'])
            nowdate = datetime.datetime.utcnow()
            finaldata[i]['time'] = int((nowdate - postdate).seconds/3600)

        for i in range(0,60):
            for key in list(finaldata[i]):
                if key == 'url':
                    temp = urlparse(finaldata[i][key]).hostname
                    finaldata[i]["website"] = temp


        return jsonify(finaldata)

    @app.route('/hello2')
    def hello2():
        return render_template('newsfeed.html')

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)


    return app
