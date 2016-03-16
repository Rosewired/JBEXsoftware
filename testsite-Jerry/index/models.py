from django.db import migrations, models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    
    #id = models.AutoField(primary_key = True)
    user = models.OneToOneField(User)
    #if_student = models.BooleanField(blank = True, null = True)
    score = models.CharField(max_length=50)
    


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])

# Create your models here.
