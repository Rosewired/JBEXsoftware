from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.teacherPage, name='teacher'),
    url(r'^logout/$', views.teacherLogout),
    url(r'^addstd/$', views.addStudent),
    url(r'^removestd/$', views.removeStudent),
]
