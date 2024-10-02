from django.db import models


class ContestRegistration(models.Model):
    registration_id = models.AutoField(primary_key=True)
    participant = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='registrations')
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE, related_name='registrations')
    registration_date_and_time = models.DateTimeField()
    contest_submission_time = models.DateTimeField()
    total_time_taken = models.DurationField()


# Narayan's database schemas
class SubmissionResult(models.Model):
    result_id = models.AutoField(primary_key=True)
    submission = models.ForeignKey(Submissions, on_delete=models.CASCADE)
    testcase = models.ForeignKey(Testcases, on_delete=models.CASCADE)
    is_passed = models.BooleanField()
    execution_time = models.FloatField()
    memory_used = models.IntegerField()

    class Meta:
        db_table = 'submission_result'

    def __str__(self):
        return f'Result {self.result_id} for Submission {self.submission_id}'


class TestCases(models.Model):
    testcase_id = models.AutoField(primary_key=True)
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    input = models.TextField()
    expected_output = models.TextField()
    time_limit = models.IntegerField() 
    memory_limit = models.IntegerField()

    class Meta:
        db_table = 'test_case'
        verbose_name = 'Test Case'

    def __str__(self):
        return f'TestCase {self.testcase_id} for Problem {self.problem_id}'


class Ranking(models.Model):
    ranking_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    rank = models.IntegerField()
    total_score = models.DecimalField(max_digits=10, decimal_places=2)
    time_taken = models.IntegerField()

    class Meta:
        db_table = 'ranking'
        verbose_name = 'Ranking'

    def __str__(self):
        return f'Ranking {self.ranking_id} for User {self.user_id}'


class Language(models.Model):
    language_id = models.AutoField(primary_key=True)
    language = models.CharField(max_length=50)

    class Meta:
        db_table = 'language'
        verbose_name = 'Programming Language'

    def __str__(self):
        return self.language


class Problems(models.Model):
    problem_id = models.AutoField(primary_key=True)
    host = models.ForeignKey(Users, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    input_format = models.TextField()
    output_format = models.TextField()
    constraints = models.TextField()
    difficulty_level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'problems'
        verbose_name = 'Problem'

    def __str__(self):
        return self.name


class Samples(models.Model):
    sample_id = models.AutoField(primary_key=True)
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    sample_input = models.TextField()
    sample_output = models.TextField()
    sample_order = models.IntegerField()

    class Meta:
        db_table = 'sample_input_output'
        verbose_name = 'Sample Input/Output'

    def __str__(self):
        return f'Sample {self.sample_id} for Problem {self.problem_id}'

# Pankaj's Table


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    login_password = models.CharField(max_length=255)
    overall_rank = models.IntegerField()
    user_created_at = models.DateTimeField(auto_now_add=True)
    user_updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'users'

    def __str__(self):
        return self.name


class UserDetails(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    achievements = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'user_details'
        verbose_name = 'user_details'

    def __str__(self):
        return f"Details of {self.user.name}"


class SocialMediaLink(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    platform_name = models.CharField(max_length=50)
    link = models.URLField()

    class Meta:
        db_table = 'social_medial_link'
        verbose_name = 'social_medial_link'

    def __str__(self):
        return f"{self.platform_name} link for {self.user.name}"


class UserAddress(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    address = models.TextField()
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_address'
        verbose_name = 'user_address'

    def __str__(self):
        return f"Address of {self.user.name}"


class Contests(models.Model):
    host = models.ForeignKey(Users, on_delete=models.CASCADE)
    contest_name = models.CharField(max_length=100)
    contest_start_date = models.DateField()
    contest_end_date = models.DateField()
    organization_type = models.CharField(max_length=50)
    organization_name = models.CharField(max_length=100)
    participant_limit = models.IntegerField()
    contest_visibility = models.BooleanField(default=True)
    contest_status = models.CharField(max_length=50)
    contest_created_at = models.DateTimeField(auto_now_add=True)
    contest_updated_at = models.DateTimeField(auto_now=True)
    registration_deadline = models.DateField()

    class Meta:
        db_table = 'contests'
        verbose_name = 'contest'

    def __str__(self):
        return f"Registration {self.registration_id} for Contest {self.contest.contest_name}"


class ContestDetails(models.Model):
    contest_id = models.OneToOneField(Contests, on_delete=models.CASCADE, primary_key=True, related_name='details')
    contest_banner_image = models.CharField(max_length=255)
    contest_default_banner_image = models.CharField(max_length=255)
    about = models.TextField()
    eligibility = models.TextField()
    rules = models.TextField()
    others = models.TextField()

    def __str__(self):
        return f"Details of Contest {self.contest.contest_name}"


class ContestPrizes(models.Model):
    prize_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE, related_name='prizes')
    prize_position = models.IntegerField()
    prize_description = models.TextField()
    prize_amount = models.DecimalField(max_digits=10, decimal_places=2)
    others = models.TextField()
    winner = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Prize {self.prize_id} for Contest {self.contest.contest_name}"


class ContestProblems(models.Model):
    contest_problem_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE, related_name='problems')
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE, related_name='contest_problems')
    order_of_problem_in_contest = models.IntegerField()
    weightage = models.IntegerField()

    def __str__(self):
        return f"Problem {self.problem.title} in Contest {self.contest.contest_name}"
    

class Submissions(models.Model):
    submission_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE, related_name='submissions')
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE, related_name='submissions')
    participant = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField()
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='submissions')
    code = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Submission {self.submission_id} by {self.user.name} for Problem {self.problem.title}"