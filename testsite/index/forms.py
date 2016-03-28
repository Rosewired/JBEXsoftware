from django import forms
from models import *

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile #create a form based on UserProfile model
        fields = ('score',) #fields to be edited

class updateScoreForm(forms.ModelForm):
    class Meta:
        model = ScoreInfo
        fields = '__all__'
