from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.loadMain, name='main'),
    url(r'^slogin/$', views.studentLogin),
    url(r'^tlogin/$', views.teacherLogin),
    url(r'^version/$', views.getVersion),
]
