# Generated by Django 4.2.13 on 2024-08-12 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_customprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilesave',
            name='langchainkey',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
    ]
