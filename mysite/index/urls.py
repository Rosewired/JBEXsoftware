from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login/$', views.Login),
    url(r'^logout/$', views.Logout),
    url(r'^accounts/logout/$', views.Logout),
    url(r'^accounts/loggedin/$', views.loggedin),
    url(r'^accounts/invalid/$', views.invalid_login),
    url(r'^accounts/register/$', views.register_user),
    url(r'^accounts/success/$', views.register_success),
    url(r'^accounts/profile/$', views.user_profile),
    url(r'^accounts/signup/$', views.register_teacher),
    url(r'^accounts/teacher/$', views.teacher_loggedin),
]