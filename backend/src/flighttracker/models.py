from datetime import datetime
from enum import Enum
from django.db import models

STATUS_OPTIONS = [
    ('Success', 'Success'),
    ('Failure', 'Failure'),
]


class FightStatus(Enum):
    SUCCESS = 'SUCCESS'
    FAILURE = 'FAILURE'
    RUNNING = 'RUNNING'
    STOPPED = 'STOPPED'


class UAVFlight(models.Model):
    uav_no = models.CharField(max_length=8)
    grs_job_no = models.CharField(max_length=8)
    job_desc = models.CharField(max_length=255)
    pm_name = models.CharField(max_length=50, null=True)
    transfer_started = models.DateTimeField(null=True, verbose_name='Transferring')
    transfer_ended = models.DateTimeField(null=True, verbose_name='Transfer Ended')
    transfer_status = models.CharField(max_length=10, null=True, verbose_name='Transfer Status',
                                       choices=STATUS_OPTIONS)
    pix4d_step_1_started = models.DateTimeField(null=True, verbose_name='PIX4D Step One Running')
    pix4d_step_1_ended = models.DateTimeField(null=True, verbose_name='PIX4D Step One Ended')
    pix4d_step_1_status = models.CharField(max_length=10, null=True, verbose_name='PIX4D Step One Status',
                                           choices=STATUS_OPTIONS)
    pix4d_step_2_started = models.DateTimeField(null=True, verbose_name='PIX4D Step Two Running')
    pix4d_step_2_ended = models.DateTimeField(null=True, verbose_name='PIX4D Step Two Ended')
    pix4d_step_2_status = models.CharField(max_length=10, null=True, verbose_name='PIX4D Step Two Status',
                                           choices=STATUS_OPTIONS)
    pix4d_step_3_started = models.DateTimeField(null=True, verbose_name='PIX4D Step Three Running')
    pix4d_step_3_ended = models.DateTimeField(null=True, verbose_name='PIX4D Step Three Ended')
    pix4d_step_3_status = models.CharField(max_length=10, null=True, verbose_name='PIX4D Step Three Status',
                                           choices=STATUS_OPTIONS)
    post_pix4d_started = models.DateTimeField(null=True, verbose_name='POST PIX4D Running')
    post_pix4d_ended = models.DateTimeField(null=True, verbose_name='POST PIX4D Ended')
    post_pix4d_status = models.CharField(max_length=10, null=True, verbose_name='POST PIX4D Status',
                                         choices=STATUS_OPTIONS)
    errors = models.TextField(null=True)
    comments = models.TextField(null=True)

    def __str__(self):
        return '{} - {}'.format(self.uav_no, self.grs_job_no)

    @property
    def verbose_name_list(self):
        return ['Transferring', 'Pix4d Step 1', 'Pix4d Step 2', 'Pix4d Step 3', 'Post Pix4d']

    @property
    def current_step_info(self):
        sorted_start_list = [self.transfer_started, self.pix4d_step_1_started, self.pix4d_step_2_started,
                             self.pix4d_step_3_started,
                             self.post_pix4d_started]
        sorted_end_list = [self.transfer_ended, self.pix4d_step_1_ended, self.pix4d_step_2_ended,
                           self.pix4d_step_3_ended,
                           self.post_pix4d_ended]
        sorted_status_list = [self.transfer_status, self.pix4d_step_1_status, self.pix4d_step_2_status,
                              self.pix4d_step_3_status, self.post_pix4d_status]

        all_steps_count = len(self.verbose_name_list)
        success_steps_count = sorted_status_list.count('Success')
        failure_steps_count = sorted_status_list.count('Failure')

        if failure_steps_count == 0:
            if success_steps_count < all_steps_count:
                final_not_end_index = sorted_status_list.index(None)
                final_start = sorted_start_list[final_not_end_index]
                if final_start is not None:
                    current_step_name = self.verbose_name_list[final_not_end_index]
                    if final_not_end_index < len(sorted_end_list) - 1:
                        next_step_names = self.verbose_name_list[final_not_end_index + 1:]
                    else:
                        next_step_names = None
                else:
                    current_step_name = None
                    next_step_names = None

                if final_not_end_index > 0:
                    last_step_name = self.verbose_name_list[final_not_end_index - 1]
                    last_end = sorted_end_list[final_not_end_index - 1]
                    if current_step_name is None:
                        current_step_name = 'Stopped after {} ({})'.format(last_step_name,
                                                                           last_end.strftime('%m-%d %H:%M'))

                else:
                    if current_step_name is None:
                        current_step_name = 'Not Started Yet'
                    last_step_name = None

            else:
                final_start = None
                current_step_name = 'All Done'
                next_step_names = None
                last_step_name = self.verbose_name_list[-1]
        else:
            failure_step_index = sorted_status_list.index('Failure')
            final_start = None
            current_step_name = 'Failure during {}'.format(self.verbose_name_list[failure_step_index])
            next_step_names = None
            last_step_name = self.verbose_name_list[failure_step_index - 1]

        all_time_slots = [item for item in sorted_start_list + sorted_end_list if item is not None]
        if final_start is None and len(all_time_slots) > 0:
            latest_time = max(all_time_slots)
        else:
            latest_time = datetime.now()

        remaining_steps_count = all_steps_count - success_steps_count - failure_steps_count
        if final_start:
            remaining_steps_count -= 1

        return final_start, current_step_name, next_step_names, last_step_name, latest_time, \
               success_steps_count, failure_steps_count, remaining_steps_count

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
            return '➡️️'.join(next_step_names)
        return next_step_names

    @property
    def last_step_name(self):
        return self.current_step_info[3]

    @property
    def latest_time(self):
        return self.current_step_info[4]

    @property
    def success_steps_count(self):
        return self.current_step_info[5]

    @property
    def failure_steps_count(self):
        return self.current_step_info[6]

    @property
    def remaining_steps_count(self):
        return self.current_step_info[7]

    @property
    def total_hours(self):
        if not self.current_start:
            total_hours = self.latest_time - self.transfer_started
        else:
            total_hours = datetime.now() - self.transfer_started

        return f'{round(total_hours.total_seconds() / 3600.0, 1)} hours'

    @property
    def latest_status(self):
        if self.current_start:
            return FightStatus.RUNNING.value
        elif self.failure_steps_count > 0:
            return FightStatus.FAILURE.value
        elif self.success_steps_count == len(self.verbose_name_list):
            return FightStatus.SUCCESS.value
        else:
            return FightStatus.STOPPED.value
