from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Contests
from .serializers import ContestsSerializer
from datetime import datetime


class AddContestDetailsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        try:
            if 'start_date_time' in data:
                data['start_date_time'] = datetime.strptime(data['start_date_time'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
            if 'end_date_time' in data:
                data['end_date_time'] = datetime.strptime(data['end_date_time'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
        except ValueError as e:
            return Response({"error": f"Date format error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ContestsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("serializer errors", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContestDetailsView(APIView):

    def get(self, request, *args, **kwargs):
        contests = Contests.objects.all()
        
        if contests:
            serializer = ContestsSerializer(contests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Message": "No data to show"}, status=status.HTTP_204_NO_CONTENT)

    def handle_method_not_allowed(self, request, *args, **kwargs):
        return Response({'error': 'Only GET method is allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
