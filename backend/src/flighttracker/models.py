from datetime import datetime

from django.db import models


class UAVFlight(models.Model):
    uav_no = models.CharField(max_length=8)
    grs_job_no = models.CharField(max_length=8)
    job_desc = models.CharField(max_length=255)
    pm_name = models.CharField(max_length=50, null=True)
    transfer_started = models.DateTimeField(null=True, verbose_name='Transferring')
    transfer_ended = models.DateTimeField(null=True, verbose_name='Transfer Ended')
    pix4d_step_1_started = models.DateTimeField(null=True, verbose_name='PIX4D Step One Running')
    pix4d_step_1_ended = models.DateTimeField(null=True, verbose_name='PIX4D Step One Ended')
    pix4d_step_2_started = models.DateTimeField(null=True, verbose_name='PIX4D Step Two Running')
    pix4d_step_2_ended = models.DateTimeField(null=True, verbose_name='PIX4D Step Two Ended')
    pix4d_step_3_started = models.DateTimeField(null=True, verbose_name='PIX4D Step Three Running')
    pix4d_step_3_ended = models.DateTimeField(null=True, verbose_name='PIX4D Step Three Ended')
    post_pix4d_started = models.DateTimeField(null=True, verbose_name='POST PIX4D Running')
    post_pix4d_ended = models.DateTimeField(null=True, verbose_name='POST PIX4D Ended')
    errors = models.TextField(null=True)
    comments = models.TextField(null=True)

    def __str__(self):
        return '{} - {}'.format(self.uav_no, self.grs_job_no)

    @property
    def current_step_info(self):
        verbose_name_list = ['Transferring', 'Pix4d Step 1', 'Pix4d Step 2', 'Pix4d Step 3', 'Post Pix4d']
        sorted_start_list = [self.transfer_started, self.pix4d_step_1_started, self.pix4d_step_2_started,
                             self.pix4d_step_3_started,
                             self.post_pix4d_started]
        sorted_end_list = [self.transfer_ended, self.pix4d_step_1_ended, self.pix4d_step_2_ended,
                           self.pix4d_step_3_ended,
                           self.post_pix4d_ended]

        if None in sorted_end_list:
            current_not_end_index = sorted_end_list.index(None)
            current_start = sorted_start_list[current_not_end_index]
            if current_start is not None:
                current_step_name = verbose_name_list[current_not_end_index]
                if current_not_end_index < len(sorted_end_list) - 1:
                    next_step_names = verbose_name_list[current_not_end_index + 1:]
                else:
                    next_step_names = None
            else:
                current_step_name = None
                next_step_names = None

            if current_not_end_index > 0:
                last_step_name = verbose_name_list[current_not_end_index - 1]
                last_end = sorted_end_list[current_not_end_index - 1]
                if current_step_name is None:
                    current_step_name = 'Stopped at {} ({})'.format(last_step_name,
                                                                    last_end.strftime('%m-%d %H:%M'))
            else:
                if current_step_name is None:
                    current_step_name = 'Not Started Yet'
                last_step_name = None
        else:
            current_start = None
            current_step_name = 'All Done'
            next_step_names = None
            last_step_name = verbose_name_list[-1]

        all_time_slots = [item for item in sorted_start_list + sorted_end_list if item is not None]
        if current_start is None and len(all_time_slots) > 0:
            latest_time = max(all_time_slots)
        else:
            latest_time = datetime.now()

        return current_start, current_step_name, next_step_names, last_step_name, latest_time

    @property
    def current_start(self):
        return self.current_step_info[0]

    @property
    def current_step_name(self):
        return self.current_step_info[1]

    @property
    def next_step_names(self):
        next_step_names = self.current_step_info[2]
        if next_step_names is not None and isinstance(next_step_names, list):
            return ' ➡️ ️'.join(next_step_names)
        return next_step_names

    @property
    def last_step_name(self):
        return self.current_step_info[3]

    @property
    def latest_time(self):
        return self.current_step_info[4]
