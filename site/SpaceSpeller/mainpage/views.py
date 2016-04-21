from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.http import HttpResponse

import json

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
                    return HttpResponse('Not a student.')
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

"""
Get current version of the project
"""
def getVersion(request):
    version_path = './mainpage/static/mainpage/others/version.json'
    
    with open(version_path, 'r+') as version_file:
	version_data = version_file.read() #read version file to a string
	version_dict = json.loads(version_data) #turn string into python dictionary
	version = version_dict['version-string'] #get version number from dictionary
		
    return HttpResponse(json.dumps(version), content_type='application/json')
