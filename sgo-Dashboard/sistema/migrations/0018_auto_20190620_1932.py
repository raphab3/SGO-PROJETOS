# Generated by Django 2.0.4 on 2019-06-20 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema', '0017_auto_20190615_2247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chamado',
            name='img',
            field=models.FileField(blank=True, null=True, upload_to='sistema/chamados', verbose_name='Envie uma foto'),
        ),
    ]
