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
        operation_description="Submete um problema para ser avaliado pela API do the Huxley.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING, description='Pergunta feita pelo usuário.'),
            },
            required=['message']
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
        user_msg = self.request.data['message']
        chat = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{"role": "system", "content": 'Você irá somente dar dicas simples, não forneca código corrigido'},
                        {"role": "user", "content": user_msg}
            ]
        )
        response = chat["choices"][0]["message"]["content"]
        return Response(data={'response':response})