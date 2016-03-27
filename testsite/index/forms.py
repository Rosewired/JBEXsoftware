from django import forms
from models import UserProfile

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile #create a form based on UserProfile model
        fields = ('score',) #fields to be edited
