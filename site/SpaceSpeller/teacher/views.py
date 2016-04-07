from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.core import serializers
from django.contrib.auth.models import User
from django.http import HttpResponse

import game1.models
import json

@login_required
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

    return render(request, 'teacher/teacher.html', {'ex': data, 'ex2': score_list})


"""JSON serializer for objects not serializable by default json code"""
def json_serial(obj):
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")

"""
Create a student login
Add student infomation to database
"""
def addStudent(request):
    if request.method == "POST":
        fn = request.POST['firstname']
        ln = request.POST['lastname']
        stdid = request.POST['studentid']

        print(fn)
        print(ln)
        print(stdid)
        print(fn[0])

        return HttpResponse('')
