from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from login import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from RandomWordGenerator import generateRandomWords
from forms import *
import models
from django.db.models import Q, Max
from datetime import datetime
from django.core import serializers
import json

def studentLogin(request):
    next = request.GET.get('next', '/home/')
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                if user.groups.filter(name='Student').exists():
                    login(request, user)
                    
                    return HttpResponse('/game/')
                else:
                    return HttpResponse("You are not a student!")
            else:
                return HttpResponse("Inactive user.")
        else:
            return HttpResponse('/accounts/invalid')

    return render(request, "index/login.html", {'redirect_to': next})

def teacherLogin(request):
    next = request.GET.get('next', '/home/')
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                if user.groups.filter(name='Teacher').exists():
                    login(request, user)
                    teacherPageScore(request)
                    return HttpResponse('/teacher/')
                else:
                    return HttpResponse("You are not a teacher!")
            else:
                return HttpResponse("Inactive user.")
        else:
            return HttpResponse('/accounts/invalid')

    return render(request, "index/login.html", {'redirect_to': next})
    
def invalid_login(request):
    return render(request, 'invalid_login.html')

@login_required
def teacherPageScore(request):
    l = list(models.UserProfile.objects.all())
    student_info = []

    for i in range(0, len(l)-1):
        print(l[i].user)
        #username = l[i].user
        #score = l[i].score

@login_required
def loggedin(request):
    l = list (models.ScoreInfo.objects.filter(student_id = StudentInfo.objects.get(username=request.user.username)).values_list("score", flat=True))
    print
    #models.UserProfile.objects.exclude(score__isnull = True)
    #l = list (models.UserProfile.objects.filter(~Q(score = '')).values_list("score", flat = True))
    max_score = 0
    return render(request, 'loggedin.html', {'full_name': request.user.username, 'score': l, 'score2': max_score, 'time':datetime.now()})
    

def Logout(request):
    logout(request)
    return render(request, 'logout.html')
    

def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/accounts/success')
            
    args = {}
    
    
    args['form'] = UserCreationForm()
    
    return render(request, 'register.html', args)
    
def register_success(request):
    return render(request, 'register_success.html')


@login_required
def Home(request):
    return render(request, "index/home.html", {})

def Blog(request):
    return render(request, "index/blog.html", {})

@login_required
def gamePage(request):
        rand_words = generateRandomWords()

                 
        return render(request, 'index.html', {'value':rand_words})

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")

@login_required
def teacherPage(request):
    std = models.StudentInfo.objects.all()
    score = models.ScoreInfo.objects.filter(student_id=std[0]).values_list("recordtime", "score")
    data = []
    json_date = []
    test = {}

    for i in range(0, std.count()):
        score = models.ScoreInfo.objects.filter(student_id=std[i]).values_list("recordtime", "score")
        
        for j in range(0, len(score)):
            dt = json_serial(score[j][0])
            json_date.append((dt, score[j][1]))

        test[std[i].username] = json_date
        json_date = []

    
    data = serializers.serialize("json", std)
    score_list = json.dumps(test)

    return render(request, 'teacher.html', {'ex': data, 'ex2': score_list})

def about(request):
    return render(request, 'about.html')

@login_required
@csrf_exempt
def user_profile(request):
    if request.method == "POST":
        form = UserProfileForm(request.POST or None, instance = request.user.profile)
        if form.is_valid():
            form.save()
            #return HttpResponse('/accounts/loggedin')
            return HttpResponseRedirect('/accounts/loggedin')
    else:
        user = request.user
        profile = user.profile
        form = UserProfileForm(instance=profile)
        
        args = {}
    
        args['form'] = form
    
        return render(request, 'profile.html', args)

@login_required
@csrf_exempt
def add_score(request):
    if request.method == "POST":
        if request.user.is_authenticated():
            user = request.user.username
            l = StudentInfo.objects.get(username=user)
            #.values_list('idstudent', flat=True)
            #student_id = l[0].encode("utf-8")
            
            score = request.POST['score']

            new_record = models.ScoreInfo(student_id=l, score=score)
            new_record.save()

        return HttpResponseRedirect('/accounts/loggedin/')
