from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from login import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from forms import UserProfileForm
import models
from django.db.models import Q, Max
from datetime import datetime

def Login(request):
    next = request.GET.get('next', '/home/')
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/accounts/loggedin')
            else:
                return HttpResponse("Inactive user.")
        else:
            return HttpResponseRedirect('/accounts/invalid')

    return render(request, "index/login.html", {'redirect_to': next})
    
def teacher_Login(request):
    next = request.GET.get('next', '/home/')
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/accounts/teacher_loggedin')
            else:
                return HttpResponse("Inactive user.")
        else:
            return HttpResponseRedirect('/accounts/invalid')

    return render(request, "index/login.html", {'redirect_to': next})
    
def invalid_login(request):
    return render(request, 'invalid_login.html')

@login_required 
def loggedin(request):
    #filterargs = {score != " "}
    
    l = list (models.UserProfile.objects.filter(user_id = request.user.profile.user_id).filter(~Q(score = '')).values_list("score", flat = True))
    #models.UserProfile.objects.exclude(score__isnull = True)
    #l = list (models.UserProfile.objects.filter(~Q(score = '')).values_list("score", flat = True))
    max_score = models.UserProfile.objects.filter(user_id = request.user.profile.user_id).filter(~Q(score = '')).aggregate(Max('score'))['score__max']
    return render(request, 'loggedin.html', {'full_name': request.user.username, 'score': l, 'score2': max_score, 'time':datetime.now()})

@login_required 
def teacher_loggedin(request):
    return render(request, 'teacher_loggedin.html', {'full_name': request.user.username})

@login_required 
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
    
def register_teacher(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/accounts/success')
            
    args = {}
    
    
    args['form'] = UserCreationForm()
    
    return render(request, 'teacher_register.html', args)
    
def register_success(request):
    return render(request, 'register_success.html')

@login_required
def user_profile(request):
    #instance = get_object_or_404(POST, id=id)
    if request.method == 'POST':
        form = UserProfileForm(request.POST or None, instance = request.user.profile)
        if form.is_valid():
            #instance = form.save(commit=False)
            form.save()
            return HttpResponseRedirect('/accounts/loggedin')
    else:
        user = request.user
        profile = user.profile
        form = UserProfileForm(instance=profile)
        
    args = {}
    
    args['form'] = form
    
    return render(request, 'profile.html', args)