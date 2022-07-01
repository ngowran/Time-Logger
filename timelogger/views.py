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

config={
  "apiKey": "AIzaSyCRLXur7Aruh_EADjxKRsWtA-HY0P-G_ao",
  "authDomain": "renu-22cf0.firebaseapp.com",
  "databaseURL": "https://renu-22cf0-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "renu-22cf0",
  "storageBucket": "renu-22cf0.appspot.com",
  "messagingSenderId": "478924071511",
  "appId": "1:478924071511:web:d5cd8a215a9cd724bb7912",
  "measurementId": "G-F0J0XM9SJQ"
}

firebase= pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()

now = datetime.now()
current_date = now.strftime("%d:%m:%Y")
current_time = now.strftime("%H:%M:%S")

class Time(APIView):
  def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        name = name.upper()
        time = request.data.get('time')
        reason = request.data.get('reason')
        try:
          # const timelog={name, time, reason}
          data = {
            "name":name,
            "time":time,
            "reason":reason,
            "date":current_date,
            "hour":current_time
          }
          results = database.child("timelogger").push(data)
          return HttpResponse(200, "Time Added")
        except:
          return HttpResponse(404, "Something went wrong.")

  def get(self, request, *args, **kwargs):
    logs = database.child('timelogger').get()
    array = []
    for log in logs.each():
      print(log.val())
      array.append(log.val())
    return Response(array)