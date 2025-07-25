# Generated by Django 2.1.15 on 2025-07-01 17:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clinico', '0123_auto_20250519_1153'),
        ('enfermeria', '0012_auto_20250701_1633'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoriaExamenes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('dosisFormulada', models.IntegerField(default=0)),
                ('cantidadFormulada', models.IntegerField(default=0)),
                ('consecutivoEnfermeria', models.IntegerField(blank=True, default=0, null=True)),
                ('fechaRegistro', models.DateTimeField(blank=True, null=True)),
                ('estadoReg', models.CharField(default='A', editable=False, max_length=1)),
                ('historiaMedicamentos', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='clinico.HistoriaMedicamentos')),
            ],
        ),
    ]
