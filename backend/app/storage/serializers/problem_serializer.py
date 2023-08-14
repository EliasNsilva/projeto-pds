from rest_framework import serializers
import django_filters

from app.storage.models import Problem

class ProblemFilter(django_filters.FilterSet):
    attributes = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Problem
        fields = ['attributes']

class ProblemSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Problem
        fields = '__all__'