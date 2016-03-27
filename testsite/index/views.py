from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from login import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from RandomWordGenerator import generateRandomWords
from forms import UserProfileForm
import models
from django.db.models import Q, Max
from datetime import datetime

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
def loggedin(request):
    l = list (models.UserProfile.objects.filter(user_id = request.user.profile.user_id).filter(~Q(score = '')).values_list("score", flat = True))
    #models.UserProfile.objects.exclude(score__isnull = True)
    #l = list (models.UserProfile.objects.filter(~Q(score = '')).values_list("score", flat = True))
    max_score = models.UserProfile.objects.filter(user_id = request.user.profile.user_id).filter(~Q(score = '')).aggregate(Max('score'))['score__max']
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

@login_required
def teacherPage(request):
    return render(request, 'teacher.html', {})

def about(request):
    return render(request, 'about.html')

@login_required
@csrf_exempt
def user_profile(request):
    if request.method == "POST":
        print('here1')
        form = UserProfileForm(request.POST or None, instance = request.user.profile)
        print('here2')
        if form.is_valid():
            print('here3')
            form.save()
            print('here4')
            #return HttpResponse('/accounts/loggedin')
            return HttpResponseRedirect('/accounts/loggedin')
    else:
        user = request.user
        profile = user.profile
        form = UserProfileForm(instance=profile)
        
        args = {}
    
        args['form'] = form
    
        return render(request, 'profile.html', args)
