from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, reverse
from django.contrib import messages
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.conf import settings
from datetime import datetime
import pyrebase
import os
from dotenv import load_dotenv

load_dotenv()

config = {
    "apiKey": os.getenv("API_KEY"),
    "authDomain": os.getenv("AUTH_DOMAIN"),
    "databaseURL": os.getenv("DATABASE_URL"),
    "projectId": os.getenv("PROJECT_ID"),
    "storageBucket": os.getenv("STORAGE_BUCKET"),
    "messagingSenderId": os.getenv("MESSAGING_SENDER_ID"),
    "appId": os.getenv("APP_ID"),
    "measurementId": os.getenv("MEASUREMENT_ID")
}

firebase = pyrebase.initialize_app(config)
authe = firebase.auth()
database = firebase.database()


class Time(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        photoURL = request.data.get('photoURL')
        time = request.data.get('time')
        reason = request.data.get('reason')
        now = datetime.now()
        current_date = now.strftime("%d:%m:%Y")
        current_time = now.strftime("%H:%M:%S")
        if name and len(reason) > 0 and len(time) > 0:
            try:
                # const timelog={name, time, reason}
                data = {
                    "name": name,
                    "time": time,
                    "reason": reason,
                    "date": current_date,
                    "hour": current_time,
                    "from": "website",
                    "photoURL": photoURL
                }
                results = database.child("timelogger").push(data)
                return Response("Time Added")
            except:
                return Response("Something went wrong.")
        else:
            return Response("Something went wrong.")

    def get(self, request, *args, **kwargs):
        logs = database.child('timelogger').get()
        array = []
        for log in logs.each():
            array.append(log.val())
        array = array[::-1]
        return Response(array)


class Total(APIView):
    def get(self, request, *args, **kwargs):
        logs = database.child('timelogger').get()
        array = []
        for log in logs.each():
            array.append(int(log.val()["time"]))
        total = sum(array)
        hours = total // 60
        minutes = total % 60
        return Response(f"{hours} hours {minutes} minutes")
