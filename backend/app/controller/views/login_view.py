import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # Importe o módulo status

class LoginView(APIView):
    def post(self, request):
        huxley_login_url = 'https://www.thehuxley.com/api/login'
        username = request.data.get('username')
        password = request.data.get('password')  

        payload_auth = {
            "username": username,
            "password": password
        }

        response_login = requests.post(url=huxley_login_url, json=payload_auth)
        # return Response(response.json(), status=response.status_code) 
        
        if response_login.status_code == 200:
            access_token = response_login.json().get('access_token')

            user_url = 'https://www.thehuxley.com/api/v1/user'
            headers = {
                'Authorization': f'Bearer {access_token}'
            }

            user_response = requests.get(url=user_url, headers=headers)
            if user_response.status_code == 200:

                combined_response = {
                    'login_response': response_login.json(),
                    'user_response': user_response.json()
                }

                #return Response(user_response.json(), status=user_response.status_code)
                return Response(combined_response, status=user_response.status_code)
            else:
                return Response({'error': 'Erro ao obter os dados do usuário'}, status=user_response.status_code)
        else:
            return Response({'error': 'Erro ao fazer login'}, status=response.status_code)       
