from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.core import serializers

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


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")
