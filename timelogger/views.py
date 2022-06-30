from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, reverse
from django.contrib import messages
from django.views.generic.base import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import pyrebase
import os


firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()

def timeadd(request):
  if request.method == "POST":
    try:
      email = request.POST.get('email')
      passs = request.POST.get('pass')
      name = request.POST.get('name')
      results = database.child("time-logger").child(user['localId']).set(data)
      return HttpResponse(200, "Time Added")
    except:
      return HttpResponse(404, "Something went wrong.")