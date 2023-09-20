import io
import time
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from decouple import config
import openai
from drf_yasg import openapi

class GptApiView(APIView):
    @swagger_auto_schema(
        operation_description="Enviar uma mensagem para API do ChatGPT e retorna a resposta.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING, description='Pergunta feita pelo usuário.'),
                'behavior': openapi.Schema(type=openapi.TYPE_INTEGER, 
                                           enum=[1,2,3],
                                           description="Comportamento do assistente de IA. Sendo 1 para dicas, 2 para explicação de erro e 3 para explicação de código.")
            },
            required=['message', 'behavior']
        ),
        responses={
            200: openapi.Response(
                description='Sucesso',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'response': openapi.Schema(type=openapi.TYPE_STRING, description='Resposta do modelo.'),
                    }
                ),
            ),
        }
    )
    def post(self, request):
        openai.api_key = config('OPENAI')
        userMsg = self.request.data['message']
        gptBehavior = self.request.data['behavior']

        behaviors = {
            1 : 'Você irá somente dar dicas simples, não forneca código corrigido',
            2 : 'Explique tipo do erro sem fornecer nem um tipo de código',
            3 : 'Explique linha a linha do código de forma resumida'
        }

        chat = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{"role": "system", "content": behaviors[gptBehavior]},
                        {"role": "user", "content": userMsg}
            ]
        )
        response = chat["choices"][0]["message"]["content"]
        return Response(data={'response':response})