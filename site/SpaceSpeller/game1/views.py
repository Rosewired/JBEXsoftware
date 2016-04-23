from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from RandomWordGenerator import *
import models

@login_required
def game(request):
    user = request.user.username
    l = models.StudentInfo.objects.get(username=user)
    print(l.grade)
    print(l.grade == 1)
    rand_words = generateRandomWords(l.grade)
    return render(request, 'game1/game.html', {'value':rand_words,'stuName':l.firstname,'stuGrade':l.grade})

def updateScore(request):
    if request.method == "POST":
        if request.user.is_authenticated():
            user = request.user.username
            l = models.StudentInfo.objects.get(username=user)
            
            score = request.POST['userscore']

            new_record = models.ScoreInfo(student_id=l, score=score)
            new_record.save()

        return HttpResponse("Score updated!")
