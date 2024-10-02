from django.db import models

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
        verbose_name = 'User'

    def __str__(self):
        return self.name


class UserDetails(models.Model):
    detail_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(Users, on_delete=models.CASCADE,)
    bio = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    achievements = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'user_details'
        verbose_name = 'User Details'

    def __str__(self):
        return f"Details of {self.user.name}"


class SocialMediaLink(models.Model):
    link_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    platform_name = models.CharField(max_length=50)
    link = models.URLField()

    class Meta:
        db_table = 'social_media_links'
        verbose_name = 'Social Media Links'

    def __str__(self):
        return f"{self.platform_name} link for {self.user.name}"


class UserAddress(models.Model):
    address_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    address = models.TextField()
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_address'
        verbose_name = 'User Address'

    def __str__(self):
        return f"Address of {self.user.name}"


class Contests(models.Model):
    contest_id = models.AutoField(primary_key=True)
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
        verbose_name = 'Contest'

    def __str__(self):
        return self.contest_name


class ContestDetails(models.Model):
    contest_id = models.OneToOneField(Contests, on_delete=models.CASCADE, primary_key=True)
    contest_banner_image = models.CharField(max_length=255)
    contest_default_banner_image = models.CharField(max_length=255)
    about = models.TextField()
    eligibility = models.TextField()
    rules = models.TextField()
    others = models.TextField()

    class Meta:
        db_table = 'contest_details'
        verbose_name = 'Contest Details'

    def __str__(self):
        return f"Details of Contest {self.contest_id}"


class ContestPrizes(models.Model):
    prize_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE)
    prize_position = models.IntegerField()
    prize_description = models.TextField()
    prize_amount = models.DecimalField(max_digits=10, decimal_places=2)
    others = models.TextField()

    class Meta:
        db_table = 'contest_prizes'
        verbose_name = 'Contest Prizes'

    def __str__(self):
        return f"Prize {self.prize_id} for Contest {self.contest.contest_name}"


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


class Language(models.Model):
    language_id = models.AutoField(primary_key=True)
    language = models.CharField(max_length=50)

    class Meta:
        db_table = 'language'
        verbose_name = 'Programming Language'

    def __str__(self):
        return self.language


class ContestProblems(models.Model):
    contest_problem_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    order_of_problem_in_contest = models.IntegerField()
    weightage = models.IntegerField()

    class Meta:
        db_table = 'contest_problems'
        verbose_name = 'Contest Problems'

    def __str__(self):
        return f"Problem {self.problem.name} in Contest {self.contest.contest_name}"


class ContestRegistration(models.Model):
    registration_id = models.AutoField(primary_key=True)
    participant = models.ForeignKey(Users, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE)
    registration_date_and_time = models.DateTimeField(auto_now_add=True)
    contest_submission_time = models.DateTimeField()
    total_time_taken = models.DurationField()

    class Meta:
        db_table = 'contest_registration'
        verbose_name = 'Contest Registration'

    def __str__(self):
        return f"Registration {self.registration_id} for Contest {self.contest.contest_name}"


class Submissions(models.Model):
    submission_id = models.AutoField(primary_key=True)
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE, related_name='submissions')
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE, related_name='submissions')
    participant = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField()
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='submissions')
    code = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        db_table = 'submissions'
        verbose_name = 'Submission'

    def __str__(self):
        return f"Submission {self.submission_id} by {self.participant.name} for Problem {self.problem.name}"


class TestCases(models.Model):
    testcase_id = models.AutoField(primary_key=True)
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    input = models.TextField()
    expected_output = models.TextField()
    time_limit = models.IntegerField() 
    memory_limit = models.IntegerField()

    class Meta:
        db_table = 'test_cases'
        verbose_name = 'Test Case'

    def __str__(self):
        return f'TestCase {self.testcase_id} for Problem {self.problem.name}'


class SubmissionResult(models.Model):
    result_id = models.AutoField(primary_key=True)
    submission = models.ForeignKey(Submissions, on_delete=models.CASCADE)
    testcase = models.ForeignKey(TestCases, on_delete=models.CASCADE)
    is_passed = models.BooleanField()
    execution_time = models.FloatField()
    memory_used = models.IntegerField()

    class Meta:
        db_table = 'submission_results'
        verbose_name = 'Submission Result'

    def __str__(self):
        return f'Result {self.result_id} for Submission {self.submission.submission_id}'


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
        return f'Ranking {self.ranking_id} for User {self.user.name}'


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
        return f'Sample {self.sample_id} for Problem {self.problem.name}'
