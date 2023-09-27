import io
import time
import requests
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class SubmissionView(APIView):
    @swagger_auto_schema(operation_description="Submete um problema para ser avaliado pela API do the Huxley",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'token': openapi.Schema(type=openapi.TYPE_STRING, 
                                        description='Token de acesso.'),
                'code': openapi.Schema(type=openapi.TYPE_STRING,
                                        description="Código da questão.")
            },
            required=['token', 'code']
        ),
        responses={
            200: 'Sucesso.',
        }
    )
    def post(self, request, problem_id):     
        code = self.request.data['code']
        token = self.request.data['token']
        base_url_huxley = 'https://www.thehuxley.com/api/v1/'

        header = {'Authorization' : f'Bearer {token}'}
        
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
            
            if response.json()['testCaseEvaluations'] == None:
                time.sleep(3)
                response = requests.get(url= base_url_huxley + f'submissions/{submissionId}', headers=header)

            data = response.json()
            return Response(data=data)
        else:
            print(responseSubmission)
            return Response(data='The huxley API error', status=responseSubmission.status_code)
    
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
    

class HuxleyLastSubmissionView(APIView):
    @swagger_auto_schema(operation_description="Retorna a ultima submisão do usuário no problema escolhido.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'token': openapi.Schema(type=openapi.TYPE_STRING, 
                                        description='Token de acesso.')
            },
            required=['token']
        ),
        responses={
            200: 'Sucesso',
            404: openapi.Response(
                description='Sem submissões',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'error': openapi.Schema(type=openapi.TYPE_STRING, description='Sem submissões.'),
                    }
                ),
            ),
        }
    )
    def post(self, request, problem_id):
        token = self.request.data['token']
        baseUrlHuxley = 'https://www.thehuxley.com/api/v1/'
        urlLastSubmission = f'user/problems/{problem_id}/submissions?max=1&order=desc&sort=submissionDate'

        header = {'Authorization' : f'Bearer {token}'}

        idLastSubmission = requests.get(url= baseUrlHuxley + urlLastSubmission, headers=header)

        try:
            id = idLastSubmission.json()[0]['id']
        except:
            return Response(data={'error': 'Sem submissões'}, status=status.HTTP_404_NOT_FOUND)
        
        urlSourceCode = f'submissions/{id}/sourcecode'
        sourceCodeResponse = requests.get(url= baseUrlHuxley + urlSourceCode, headers=header)

        sourceCode = str(sourceCodeResponse.text)

        data = idLastSubmission.json()
        data[0]['code'] = sourceCode
        

        return Response(data=data)