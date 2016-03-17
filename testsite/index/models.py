# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models



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

class testAdd(models.Model):
	value = models.TextField(unique = True, blank=True, null=True)
	class Meta:
		managed = False
		db_table = 'testAdd'


'''
class Words6(models.Model):
    word = models.TextField(blank=True, null=True)  # This field type is a guess.
    id = models.TextField(primary_key=True, blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'words6'
'''