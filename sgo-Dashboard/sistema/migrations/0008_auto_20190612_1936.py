# Generated by Django 2.0.4 on 2019-06-12 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema', '0007_auto_20190612_1202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chamado',
            name='envolveAreaComum',
            field=models.BooleanField(default=False, verbose_name='Problema em área comum'),
        ),
    ]
