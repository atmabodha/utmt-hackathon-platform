from django.db import models


class ContestRegistration(models.Model):
    registration_id = models.AutoField(primary_key=True)
    participant = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='registrations')
    contest = models.ForeignKey(Contests, on_delete=models.CASCADE, related_name='registrations')
    registration_date_and_time = models.DateTimeField()
    contest_submission_time = models.DateTimeField()
    total_time_taken = models.DurationField()

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