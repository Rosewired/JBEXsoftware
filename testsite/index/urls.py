from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^slogin/$', views.studentLogin),
    url(r'^tlogin/$', views.teacherLogin),
    url(r'^logout/$', views.Logout),
    url(r'^home/$', views.Home),
    url(r'^blog/$', views.Blog),
    #url(r'^accounts/login/$', mysite.views.login),
    #url(r'^accounts/auth/$', mysite.views.auth_view),
    url(r'^accounts/logout/$', views.Logout),
    url(r'^accounts/loggedin/$', views.loggedin),
    url(r'^accounts/invalid/$', views.invalid_login),
    url(r'^accounts/register/$', views.register_user),
    url(r'^accounts/success/$', views.register_success),
    url(r'^game/$', views.gamePage),
    url(r'^about/$', views.about),
    url(r'^test/$', views.user_profile),
    url(r'^teacher/$', views.teacherPage),
]
