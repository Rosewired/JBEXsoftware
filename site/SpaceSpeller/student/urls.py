from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.studentDashboard, name='student'),
    url(r'^logout/$', views.studentLogout),    
]
