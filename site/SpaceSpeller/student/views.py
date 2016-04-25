from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import logout
from datetime import datetime
from django.http import HttpResponse

import game1.models
import json

"""
Check if logged-in account is a student account
"""
def isStudent(user):
    return user.groups.filter(name='Student').exists()

"""JSON serializer for objects not serializable by default json code"""
def json_serial(obj):
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")

def getStudentScore(user):
    std = game1.models.StudentInfo.objects.get(username=user) # All StudentInfo objects
    data = {}
    all_scores = []

    # Get all scores of the current StudentInfo (i-th in the list)
    score = game1.models.ScoreInfo.objects.filter(student_id=std).values_list("recordtime", "score")

    # This for loop serializes all the dates of the scores,
    # so that all the dates can be put in a list
    for j in range(0, len(score)):
        dt = json_serial(score[j][0]) # Serialize the 'recordtime' of the score
        all_scores.append((dt, score[j][1])) # list of tuples (the serialized 'recordtime', 'score)

    return json.dumps(all_scores)


@login_required
@user_passes_test(isStudent)
def studentDashboard(request):
    score_list = getStudentScore(request.user.username)
    
    return render(request, 'student/dashboard.html', {'score': score_list})

"""
Response to student logout
"""
def studentLogout(request):
    if request.POST.get('click', False):
        logout(request)
        return HttpResponse('/main/')

    teacherPage(request)
