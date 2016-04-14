from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test

"""
Check if logged-in account is a student account
"""
def isStudent(user):
    return user.groups.filter(name='Student').exists()


@login_required
@user_passes_test(isStudent)
def studentDashboard(request):
    return render(request, 'student/dashboard.html', { })
