import io
import time
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from decouple import config

class submissionView(APIView):
    @swagger_auto_schema(operation_description="Submete um problema para ser avaliado pela API do the Huxley",
        responses={
            200: 'Sucesso.',
        }
    )
    def post(self, request, problem_id):
        #TO DO
        # - Usar token da view nova de login        
        code = self.request.data['code']
        huxley_login_url = 'https://www.thehuxley.com/api/login'
        base_url_huxley = 'https://www.thehuxley.com/api/v1/'

        payload_auth = {"username": config('HUXLEY_USER'),
                        "password": config('HUXLEY_PASSWORD')}

        auth = requests.post(url=huxley_login_url, json=payload_auth)

        header = {'Authorization' : f'Bearer {auth.json()["access_token"]}'}
        
        payload = {'language': 1}
        
        files = {'file': ('2.c', io.StringIO(code))}
        
        responseSubmission = requests.post(url= base_url_huxley + f'user/problems/{problem_id}/submissions', 
                                            data=payload, 
                                            files=files, 
                                            headers=header
                                            )
        
        if responseSubmission.status_code == 200:
            submissionId = responseSubmission.json()['id']

            responseEvaluation = requests.get(url= base_url_huxley + f'submissions/{submissionId}/evaluation', headers=header)

            while responseEvaluation.json()['evaluation'] == 'WAITING':
                time.sleep(3)
                responseEvaluation = requests.get(url= base_url_huxley + f'submissions/{submissionId}/evaluation', headers=header)
            
            response = requests.get(url= base_url_huxley + f'submissions/{submissionId}', headers=header)
            data = response.json()
        else:
            data = responseSubmission.json()

        return Response(data=data)
    
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