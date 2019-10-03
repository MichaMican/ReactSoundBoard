#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask_api import status
from flask import Flask, request, render_template
from flask_cors import CORS
import json
from playsound import playsound
import os
import re

app = Flask(__name__, static_folder="build/static", template_folder="build")
CORS(app)


@app.route("/play", methods=['POST'])
def playSoundRequest():
    data = request.get_data()
    jsonData = json.loads(data)
    playsound("./dat/"+jsonData["playId"])
    return "", status.HTTP_202_ACCEPTED

def getAllButtonsObject():

    buttons = []

    for fileName in os.listdir("./dat"):
        if fileName.__contains__(".wav") or fileName.__contains__(".mp3"):

            fileTitle = fileName.replace(".wav", "")
            fileTitle = fileTitle.replace(".mp3", "")
            fileTitle = re.sub("([a-z])([A-Z])","\g<1> \g<2>",fileTitle)
            objToAppend={"id": fileName, "title": fileTitle}

            buttons.append(objToAppend)
    return {"buttons": buttons}


@app.route("/getButtons", methods=['GET'])
def returnAllButtons():
    obj = getAllButtonsObject()
    return json.dumps(obj), status.HTTP_202_ACCEPTED

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=80, debug=True)
    #app.run(host='0.0.0.0', port=5000)
