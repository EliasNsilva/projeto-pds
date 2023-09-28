from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

class ListQuestions(APIView):
    def get(self, request):
        # print("A view ListQuestions foi chamada!")
        # https://www.thehuxley.com/api/v1/problems?max=10&offset=0&problemType=ALGORITHM
        max_value = request.GET.get('max', 10)
        offset_value = request.GET.get('offset', 0)
        problem_type_param = request.GET.get('problemtype', 'ALGORITHM')

        url = "https://www.thehuxley.com/api/v1/problems?"
        params = {
            "max": max_value,
            "offset": offset_value,
            "problemType": problem_type_param
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()  
            data = response.json()  
            return Response(data)
        
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
