from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class ListQuestions(APIView):
    @swagger_auto_schema(
        operation_description="Lista problemas do The Huxley.",
        manual_parameters=[
            openapi.Parameter('max', openapi.IN_QUERY, description="Número máximo de problemas a serem retornadas.", type=openapi.TYPE_INTEGER, required=True),
            openapi.Parameter('offset', openapi.IN_QUERY, description="Número de problemas a serem ignoradas no início da lista.", type=openapi.TYPE_INTEGER, required=True),
            openapi.Parameter('problemtype', openapi.IN_QUERY, description="Tipo de problema (por exemplo, ALGORITHM).", type=openapi.TYPE_STRING, required=True),
            openapi.Parameter('query', openapi.IN_QUERY, description="Consulta para pesquisar problemas específicos.", type=openapi.TYPE_STRING),
        ],
        responses={
            200: 'Sucesso. Retorna uma lista de problemas.',
            500: 'Erro interno do servidor. Retorna detalhes do erro.'
        }
    )
    def get(self, request):
        # https://www.thehuxley.com/api/v1/problems?max=10&offset=0&problemType=ALGORITHM
        max_value = request.GET.get('max', 10)
        offset_value = request.GET.get('offset', 0)
        problem_type_param = request.GET.get('problemtype', 'ALGORITHM')
        query = request.GET.get('query', None)

        url = "https://www.thehuxley.com/api/v1/problems?"
        params = {
            "max": max_value,
            "offset": offset_value,
            "problemType": problem_type_param
        }

        if query != None:
            params['q'] = query

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()  
            data = response.json()  
            return Response(data)
        
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
