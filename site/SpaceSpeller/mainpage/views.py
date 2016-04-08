from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.http import HttpResponse

def loadMain(request):
    return render(request, 'mainpage/main.html')

def studentLogin(request):
    #next = request.GET.get('next', '/home/')
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                if user.groups.filter(name='Student').exists():
                    login(request, user)
                    return HttpResponse('/student/')
                else:
                    return HttpResponse('')
            else:
                return HttpResponse("Inactive user.")
        else:
            return HttpResponse('/accounts/invalid')

    return HttpResponse('/main/')

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

