from django.db import models


class UAVFlight(models.Model):
    uav_no = models.CharField(max_length=8)
    grs_job_no = models.CharField(max_length=8)
    job_desc = models.CharField(max_length=255)
    pm_name = models.CharField(max_length=50, null=True)
    transferred_started = models.DateTimeField(null=True)
    transferred_ended = models.DateTimeField(null=True)
    pix4d_step_1_started = models.DateTimeField(null=True)
    pix4d_step_1_ended = models.DateTimeField(null=True)
    pix4d_step_2_started = models.DateTimeField(null=True)
    pix4d_step_2_ended = models.DateTimeField(null=True)
    pix4d_step_3_started = models.DateTimeField(null=True)
    pix4d_step_3_ended = models.DateTimeField(null=True)
    post_pix4d_started = models.DateTimeField(null=True)
    post_pix4d_ended = models.DateTimeField(null=True)
    errors = models.TextField(null=True)
    comments = models.TextField(null=True)

    def __str__(self):
        return '{} - {}'.format(self.uav_no, self.grs_job_no)

    @property
    def current_step_info(self):
        sorted_start_list = [self.pix4d_step_1_started, self.pix4d_step_2_started, self.pix4d_step_3_started,
                            self.post_pix4d_started]
        sorted_end_list = [self.pix4d_step_1_ended, self.pix4d_step_2_ended, self.pix4d_step_3_ended,
                            self.post_pix4d_ended]
        current_end_index = sorted_end_list.index(None)
        current_start = sorted_start_list[current_end_index]
        current_end = sorted_end_list[current_end_index]
        return current_start, current_end

    @property
    def current_start(self):
        return self.current_step_info[0]

    @property
    def current_end(self):
        return self.current_step_info[1]
