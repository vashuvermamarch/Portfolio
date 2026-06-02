from django.db import models

class CategoryChoices(models.TextChoices):
    FRONTEND = 'Frontend', 'Frontend'
    BACKEND = 'Backend', 'Backend'
    AI = 'AI/ML', 'AI/ML'
    TOOLS = 'Tools', 'Tools & Others'

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CategoryChoices.choices, default=CategoryChoices.TOOLS)
    order = models.IntegerField(default=0, help_text="Order in which this skill appears")

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500, help_text="Comma-separated list of technologies used")
    link = models.URLField(blank=True, null=True, help_text="GitHub or live link")
    impact = models.TextField(blank=True, null=True, help_text="What was the impact/result?")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class Certificate(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100)
    file = models.FileField(upload_to='certificates/', blank=True, null=True, help_text="Upload PDF or Image of the certificate")

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.issuer}"


class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title
