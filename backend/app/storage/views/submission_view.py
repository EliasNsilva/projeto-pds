import time
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

class submissionView(APIView):
    def post(self, request):
        #TO DO
        # - Usar FormData para submeter o code
        # - Usar requisição port XMLHTTP
        
        code = self.request.data['code']
        huxley_login_url = 'https://www.thehuxley.com/api/login'
        huxley_submission_url = 'https://www.thehuxley.com/api/v1/user/problems/691/submissions'
        print(code)
        payload_auth = {"username": "Elias",
                        "password": "tardis40"}

        auth = requests.post(url=huxley_login_url, json=payload_auth)
        print("auth ", auth)

        header = {'Authorization' : f'Bearer {auth.json()["access_token"]}'}
        print("header ", header)

        binary_representation = ' '.join(format(byte, '08b') for byte in bytearray(code, 'utf-8'))
        print(binary_representation)

        payload = {'language': '1', 
                'file': binary_representation}
        response = requests.post(url=huxley_submission_url, json=payload, headers=header)
        print(response)
        return Response(data='tudo ok')
    
class HuxleyProblemView(APIView):
    @swagger_auto_schema(operation_description="Retorna um problema da API do The Huxley",
        responses={
            200: 'Sucesso.',
        }
    )
    def get(self, request, problem_id):
        huxleyGetUrl = f'https://www.thehuxley.com/api/v1/problems/{problem_id}' 
        problem = requests.get(url=huxleyGetUrl)
        return Response(data=problem.json())
    
    @swagger_auto_schema(operation_description="Execulta um codigo na API do The Huxley",
        responses={
            200: 'Sucesso.',
        },
    )
    def post(self, request, problem_id):
        huxleyPostUrl = f'https://www.thehuxley.com/api/v1/problems/{problem_id}/run'
        response = requests.post(url=huxleyPostUrl, json=self.request.data)
        time.sleep(5)
        hash = response.json()['hash']
        print(huxleyPostUrl + f'/{hash}')
        response = requests.get(url=huxleyPostUrl + f'/{hash}')
        return Response(data=response.json())