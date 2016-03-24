from django import forms
from models import UserProfile

class UserProfileForm(forms.ModelForm):

    class Meta:
        model = UserProfile
        #fields = ('if_student', 'score')
        fields = ('score',)