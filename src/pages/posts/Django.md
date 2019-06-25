---
title: "Django With Python3.6"
description: practice django by doc
date: '2019-06-27'
tags: ['Python']
image: 'empty.png'
---
### Django with Python3.6-
- install
    - virtualenv venv --python=/path/to/python
    - pip install django
- start project
    - `django-admin startproject <project_name>`
        - [`manage.py`](https://docs.djangoproject.com/zh-hans/2.2/ref/django-admin/)
        - `myblog/__init__.py`: must exist to declare this is python exe
        - `myblog/settings.py`: django config file
        - `myblog/urls`: django urls-declaring file
        - [`myblog/wsgi.py`](https://docs.djangoproject.com/zh-hans/2.2/howto/deployment/wsgi/gunicorn/): django deploy platform config file
    - `python manage.py runserver <host:port>`: test startproject succeed or not
- start app
    - `python manage.py startapp <app_name>`
    - `migrations`
    - `__init__.py`
    - `admin.py`
    - `apps.py`
    - `views.py`: view function
    - `urls`: app urls, it will be include to main urls
    - `models.py`: interact with database
    - `tests.py`: test scripts
- choose database
    - support by django
        - `django.db.backends.sqlite3`
        - `django.db.backends.postgresql`
        - `django.db.backends.mysql` 
        - `django.db.backends.oracle`
    - others: need setting config by self
        - mongodb
- init databse
    ```python
    # __init__.py
    import pymysql
    pymysql.install_as_MySQLdb()
    ```
    - set db config
        ```sql
        DATABASES = {
             'default': {
                 'ENGINE': 'django.db.backends.mysql',
                 'NAME': 'mysqldb',
                 'USER': 'root',
                 'PASSWORD': 'pwd',
                 'HOST': '127.0.0.1',
                 'PORT': '3306',
             }
        }
        ```
    - set db table: create <appname_classname> table
        ```python
        from django.db import models

        class Question(models.Model):
            question_text = models.CharField(max_length=200)
            pub_date = models.DateTimeField('date published')

        class Choice(models.Model):
            question = models.ForeignKey(Question, on_delete=models.CASCADE)
            choice_text = models.CharField(max_length=200)
            votes = models.IntegerField(default=0)
        ```
    - Install app: Add app to INSTALLED_APPS
        ```python
        INSTALLED_APPS = [
            'polls.apps.PollsConfig',
            ...
        ]
        ```
    - database migration
        ```python
        # init table
        python manage.py makemigrations polls
        # get the command of mysql(setted by you)
        python manage.py sqlmigrate polls 0001
        # db migration
        python manage.py migrate
        ```
- database commands example
    - `python manage.py shell`: use jango shell to exec like as ipython
        ```python
        # import db model
        from polls.models import Choice, Question
        # use datetime dependency
        from django.utils import timezone

        # set table info and save
        q = Question(question_text="What's new?", pub_date=timezone.now())
        q.save()
        # update bt Object
        q.question_text = "What's up?"
        q.save()

        # get property by Object
        Question.objects.all()
        Question.objects.filter(id=1)
        # filter by startswith: two __ if field is string
        Question.objects.filter(question_text__startswith='What')
        # filter by year: two __ if filed is datetime
        Question.objects.get(pub_date__year=current_year)
        # pk means private_key
        Question.objects.get(pk=1)
        q.pub_data
        q.id
        q.question_text

        # get foreign key in choice table
        q.choice_set.all()
        # create two choice
        q.choice_set.create(choice_text='Not much', votes=0)
        q.choice_set.create(choice_text='The sky', votes=0)
        # count
        q.choice_set.count()
        # get choice_text startswith Just hacking
        c = q.choice_set.filter(choice_text__startswith='Just hacking')
        # delete choice
        c.delete()
        ```
- SuperUser
    - set super user: `python manage.py createsuperuser`
    - Add managing app:
        ```python
        from django.contrib import admin
        from .models import Question
        admin.site.register(Question)
        ```
    - different type of key: use diff html pattern

---
### Django function parameters
- `path`(_route_, _view_, _kwargs=None_ , _name=None_)
    - route: 
        - like as regex, and load by order
        - didnt match get or post methods' parameters
    - view: use assigned views function
    - kwargs: parameters passing to assigned view function
    - name: make global name to the URL patterns of your project
