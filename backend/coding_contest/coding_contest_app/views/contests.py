from rest_framework.views import APIView
from ..serializers.contests import ContestDetailsSerializer, ContestPrizesSerializer, ContestsCreateUpdateSerializer, ContestViewSerializer,  ContestProblemsSerializer, ProblemsSerializer
from rest_framework.response import Response
from django.core import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import Contests, ContestProblems, ContestDetails, Problems, ContestPrizes
from datetime import datetime
from django.shortcuts import get_object_or_404


class ContestCreateUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, contest_id=None, *args, **kwargs):
        if contest_id:
            contest_instance = get_object_or_404(Contests, pk=contest_id)
            serializer = ContestsCreateUpdateSerializer(contest_instance, data=request.data)
        else:
            serializer = ContestsCreateUpdateSerializer(data=request.data)
            # console.error("Error deleting problem:", error);

        if serializer.is_valid():
            contest = serializer.save()
            if not contest_id:      #Save if no contest ID mean new registration.
                ContestDetails.objects.create(contest=contest)
            return Response({"status": "success", "message": "Contest has been created successfully", "data": contest.contest_id}, status=201)
        
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
    def post(self, request, contest_id, *args, **kwargs):
        contest_instance = get_object_or_404(ContestDetails, pk=contest_id)
        serializer = ContestDetailsSerializer(contest_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Updated contest details successfully'}, status=201)
        else:
            return Response({'status': 'error', 'message': 'Validation error', 'errors': serializer.errors}, status=500)
        

    def get(self, request, user_id=None, contest_id=None, *args, **kwargs):
        try:
            if user_id:
                contests = Contests.objects.filter(host=user_id).prefetch_related('details')  # Prefetch related contest details
            elif contest_id:
                contests = Contests.objects.filter(contest_id=contest_id).prefetch_related('details')
            contest_data = []
            for contest in contests:
                contest_dict = {
                    "contest_id": contest.contest_id,
                    "host": contest.host.user_id,
                    "contest_name": contest.contest_name,  # Assuming "contest_name" is equivalent to the title of the contest
                    "organization_type": contest.organization_type,
                    "organization_name": contest.organization_name,
                    "start_date_time": contest.start_date_time,
                    "end_date_time": contest.end_date_time,
                    "contest_visibility": contest.contest_visibility,  # Assuming contest_visibility exists in the Contest model
                    "participant_limit": contest.participant_limit,
                    "registration_deadline": contest.registration_deadline,
                    "created_at": contest.contest_created_at,
                    "updated_at": contest.contest_updated_at,
                    "about": contest.details.about,
                    "eligibility": contest.details.eligibility,
                    "contest_banner_image": contest.details.contest_banner_image,
                    "contest_banner_image_name": contest.details.contest_banner_image_name,
                    'contest_default_banner_image': contest.details.contest_default_banner_image,
                    "rules": contest.details.rules,
                    "others": contest.details.others
                }
                contest_data.append(contest_dict)

            return Response({
                'status': 'success',
                'message': 'Contests fetched successfully',
                'data': contest_data     if user_id else contest_dict
            }, status=200)
        except Exception as e:
            return Response({'status': 'error', 'message': 'Not able to fetch contests'}, status=500)


class ContestsProblemsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, contest_id, *args, **kwargs):
        serializer = ContestProblemsSerializer(data=request.data)
        # print("serialiser", serializer)  
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'updated Problem to Contest successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)

    def get(self, request, contest_id, *args, **kwargs):
        try:
            problems = ContestProblems.objects.filter(contest=contest_id)
            problems_fetched = []

        # Iterate through each problem and format the data
            for problem in problems:
                # Fetch related contest and problem detail
                problem_details = problem.problem

                # Create a dictionary for each problem
                problem_data = {
                    "contest_problem_id": problem.contest_problem_id,
                    "problem": {
                        "id": problem_details.problem_id,  # Assuming Problems model has an 'id' field
                        "name": problem_details.name,  # Adjust this based on the actual fields in Problems
                        "description": problem_details.description,  # Adjust accordingly
                        "input_format": problem_details.input_format,
                        "output_format": problem_details.output_format,
                        "constraints": problem_details.constraints,
                        "difficulty_level": problem_details.difficulty_level,
                        "doc_reference": problem_details.doc_references,
                        "weightage": problem_details.weightage,
                        "tags": problem_details.tags,
                        
                    },
                    "order_of_problem_in_contest": problem.order_of_problem_in_contest,
                    "weightage": problem.weightage,
                }

                # Append the problem data to the list
                problems_fetched.append(problem_data)

            # serializer = ContestProblemsSerializer(problems, many=True)
            return Response({'status': 'success', 'message': 'Contest fetched successfully', 'data': problems_fetched}, status=200)
        except Exception as e:
            print(e)
            return Response({'status': 'error', 'message': 'Not able to fetch contests'}, status=500)
    
    def delete(self, request, contest_id, problem_id, *args, **kwargs):
        try:
            # Fetch the specific problem instance to delete
            problem = get_object_or_404(ContestProblems, contest_id=contest_id, problem_id=problem_id)
            problem.delete()
            print(f"Problem with id {problem_id} deleted from contest with id {contest_id}")
            return Response({'status': 'success', 'message': 'Problem deleted successfully'}, status=200)
        except ContestProblems.DoesNotExist:
            return Response({'status': 'error', 'message': 'Problem not found'}, status=404)
        except Exception as e:
            print(e)
            return Response({'status': 'error', 'message': 'Internal server error'}, status=500)

class ContestsPrizesView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        serializer = ContestPrizesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'updated about page successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)

    def get(self, request, contest_id, *args, **kwargs):
            try:
                prizes = ContestPrizes.objects.filter(contest=contest_id)
                serializer = ContestPrizesSerializer(prizes, many=True)
                return Response({'status': 'success', 'message': 'prizes fetched successfully', 'data': serializer.data}, status=200)
            except:
                return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)

class ProblemsCreateUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['weightage'] = int(data['weightage'])
        serializer = ProblemsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Challenge added successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)
    
    def get(self, request, *args, **kwargs):
        problems = Problems.objects.all()
        try:
            serializer = ProblemsSerializer(problems, many=True)
            return Response({'status': 'success', 'message': 'Contest fetched successfully', 'data': serializer.data}, status=200)
        except:
            return Response({'status': 'error', 'message': 'Not able to fetch contests'}, status=500)

class ContestsView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['weightage'] = int(data['weightage'])
        serializer = ProblemsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Challenge added successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=500)
  