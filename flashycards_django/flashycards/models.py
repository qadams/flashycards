# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Flashcard(models.Model):
    term = models.CharField(max_length=50)
    definition = models.CharField(max_length=250)

    class JSONAPIMeta:
        resource_name = "flashcard"
