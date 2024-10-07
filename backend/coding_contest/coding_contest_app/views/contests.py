from rest_framework.views import APIView
from ..serializers.contests import ContestDetailsSerializer, ContestPrizesSerializer, ContestsCreateUpdateSerializer, ContestViewSerializer, ContestChallengesSerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import Contests
from datetime import datetime


class ContestsRegistrationView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        try:
            if 'start_date_time' in data:
                data['start_date_time'] = datetime.strptime(data['start_date_time'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
            if 'end_date_time' in data:
                data['end_date_time'] = datetime.strptime(data['end_date_time'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
            if 'registration_deadline' in data:
                data['registration_deadline'] = datetime.strptime(data['registration_deadline'], '%a %b %d %Y %H:%M:%S GMT%z').isoformat()
        except ValueError as e:
            return Response({"status": "error", "message": f"Date format error: {str(e)}"}, status=400)
        serializer = ContestsCreateUpdateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "message": "Contest has been created successfully"}, status=201)
        
        print("vlAidation" , serializer.errors)
        return Response({"status": "error", "message": "Internal Server Error"}, status=500)
    
    def get(self, request, *args, **kwargs):
        contests = Contests.objects.all()
        try:
            serializer = ContestViewSerializer(contests, many=True)
            return Response({'status': 'success', 'message': 'Contest fetched successfully', 'data': serializer.data}, status=200)
        except:
            return Response({'status': 'error', 'message': 'Not able to fetch contests'}, status=500)


class ContestsDetailsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        serializer = ContestDetailsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'updated contest details successfully'}, status=201)
        else:
            print(serializer.errors)
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)

class ContestsPrizesView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        serializer = ContestPrizesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'updated about page successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)
        

class ContestsChallengesView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['weightage'] = int(data['weightage'])
        print(type(data))
        print(data['tags'])
        serializer = ContestChallengesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Challenge added successfully'}, status=200)
        else:
            print(serializer.data)
            print(serializer.errors)
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)

class ContestsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['weightage'] = int(data['weightage'])
        print(type(data))
        print(data['tags'])
        serializer = ContestChallengesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Challenge added successfully'}, status=200)
        else:
            print(serializer.data)
            print(serializer.errors)
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)
  