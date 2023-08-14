from django.db import models

class Problem(models.Model):
    level_difficulty = [('0', 'Muito fácil'),
                        ('1', 'Fácil'),
                        ('2', 'Médio'),
                        ('3', 'Difícil'),
                        ('4', 'Muito difícil')]
    
    title = models.CharField(max_length=50, verbose_name='Titulo', null=True, blank=True)
    description = models.CharField(max_length=500, verbose_name='Descrição', null=True, blank=True)
    code = models.JSONField(verbose_name='Código', null=True, blank=True)
    difficulty = models.CharField(max_length=2, choices=level_difficulty, verbose_name='Nível de dificuldade', null=True, blank=True)

