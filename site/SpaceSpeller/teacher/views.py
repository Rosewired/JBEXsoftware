from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
from datetime import datetime
from django.core import serializers
from django.contrib.auth.models import User, Group
from django.http import HttpResponse

import game1.models
import json


"""JSON serializer for objects not serializable by default json code"""
def json_serial(obj):
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")


"""
Create a student login
Add student infomation to database

Username: first name initial and last name
Password: first and last name initial + student id
"""
def addStudent(request):
    if request.method == "POST":
        fn = request.POST['firstname']
        ln = request.POST['lastname']
        stdid = request.POST['studentid']

        # Create login for student
        username = fn.lower()[0]+ln.lower()
        user = User.objects.create_user(username, password=fn.lower()[0]+ln.lower()[0]+stdid)
        user.is_active = True

        # Add new student to student group
        g = Group.objects.get(name='Student')
        g.user_set.add(user)

        # Add new student to StudentInfo
        new_record = game1.models.StudentInfo(idstudent=stdid, firstname=fn, lastname=ln, username=username)
        new_record.save()
        
    return HttpResponse('')


"""
Delete a chosen student
"""
def removeStudent(request):
    if request.method == "POST":
        studentid = request.POST['sid']

        user = game1.models.StudentInfo.objects.get(idstudent=studentid)

        game1.models.ScoreInfo.objects.filter(student_id=user).delete()
        game1.models.StudentInfo.objects.get(idstudent=studentid).delete() 
            
        User.objects.get(username=user.username).delete()


    return HttpResponse('')


"""
Check if logged-in account is a teacher account
"""
def isTeacher(user):
    return user.groups.filter(name='Teacher').exists()


@login_required
@user_passes_test(isTeacher)
def teacherPage(request):
    std = game1.models.StudentInfo.objects.all()
    score = game1.models.ScoreInfo.objects.filter(student_id=std[0]).values_list("recordtime", "score")
    data = []
    json_date = []
    test = {}

    for i in range(0, std.count()):
        score = game1.models.ScoreInfo.objects.filter(student_id=std[i]).values_list("recordtime", "score")
        
        for j in range(0, len(score)):
            dt = json_serial(score[j][0])
            json_date.append((dt, score[j][1]))

        test[std[i].username] = json_date
        json_date = []

    data = serializers.serialize("json", std)
    score_list = json.dumps(test)

    return render(request, 'teacher/teacher.html', {'ex': data, 'ex2': score_list, 'tfn': json.dumps(request.user.username)})
