import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class submissionView(APIView):
    def get(self, request):
        code = self.request.data['code']
        huxley_login_url = 'https://www.thehuxley.com/api/login'
        huxley_submission_url = 'https://www.thehuxley.com/api/v1/user/problems/1087/submissions'
        print(code)
        payload_auth = {
                        "username": "Elias",
                        "password": "tardis40"
                        }

        auth = requests.post(huxley_login_url, payload_auth)
        header = f'{auth["token_type"]} {auth["access_token"]}'
        print("header ", header)

        binary_representation = ' '.join(format(byte, '08b') for byte in bytearray(code, 'utf-8'))
        print(binary_representation)


        payload = {'language': '1', 
                'file': binary_representation}
        response = requests.post(url=huxley_submission_url, json=payload, headers=header)
        print(response)
        return Response(data='tudo ok')
