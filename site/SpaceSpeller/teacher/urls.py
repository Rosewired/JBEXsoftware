from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.teacherPage, name='teacher'),
    url(r'^addstd/$', views.addStudent),
]
