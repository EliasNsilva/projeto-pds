from app.storage.serializers import ProblemFilter
from rest_framework import viewsets
from django_filters import rest_framework
from rest_framework import filters

from app.storage.models import Problem
from app.storage.serializers import ProblemSerializer
from app.storage.serializers import ProblemFilter

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all().order_by('difficulty')
    serializer_class = ProblemSerializer
    filterset_class = ProblemFilter
    filter_backends = [
        rest_framework.DjangoFilterBackend,
        filters.SearchFilter
    ]
    filterset_fields = '__all__'
    search_fields = ['title']