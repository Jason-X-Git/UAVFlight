# Generated by Django 2.2.4 on 2019-08-14 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flighttracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='description',
            field=models.CharField(default="Jason's article", max_length=120),
            preserve_default=False,
        ),
    ]
