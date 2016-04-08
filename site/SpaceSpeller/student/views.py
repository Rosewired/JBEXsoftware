from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def studentDashboard(request):
    return render(request, 'student/dashboard.html', { })
