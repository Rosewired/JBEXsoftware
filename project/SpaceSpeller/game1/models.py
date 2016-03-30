from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class StudentInfo(models.Model):
    idstudent = models.TextField(primary_key=True, max_length=20)  # Field name made lowercase.
    firstname = models.TextField()  
    lastname = models.TextField()
    username = models.TextField(max_length=45, blank=True, null=True)

class ScoreInfo(models.Model):
    recordtime = models.DateTimeField(default=timezone.now, primary_key=True)  #timestamp at creation
    student_id = models.ForeignKey(StudentInfo, on_delete=models.CASCADE)
    score = models.IntegerField()

    class Meta:
        unique_together = (('recordtime', 'student_id'),)

class Words1(models.Model):
    word = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True, blank=True, null=False)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'words1'


class Words2(models.Model):
    word = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True, blank=True, null=False)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'words2'


class Words3(models.Model):
    word = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True, blank=True, null=False)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'words3'


class Words4(models.Model):
    word = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True, blank=True, null=False)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'words4'


class Words5(models.Model):
    word = models.TextField(blank=True, null=True)
    id = models.AutoField(primary_key=True, blank=True, null=False)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'words5'

