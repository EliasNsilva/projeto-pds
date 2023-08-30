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

        response = requests.post(url=huxley_login_url, json=payload_auth)

        return Response(response.json(), status=response.status_code) 

        # Se você quiser personalizar a resposta de acordo com o resultado da API, pode fazer algo como:
        # if response.status_code == 200:
        #     return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        # else:
        #     return Response({"message": "Login failed"}, status=status.HTTP_400_BAD_REQUEST)
