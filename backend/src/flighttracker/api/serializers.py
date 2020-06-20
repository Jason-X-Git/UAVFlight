from rest_framework import serializers
from flighttracker.models import UAVFlight


class UAVFlightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UAVFlight
        fields = ('id', 'url', 'uav_no', 'grs_job_no', 'job_desc', 'comments',
                  'transfer_started', 'transfer_ended', 'transfer_status',
                  'pix4d_step_1_started', 'pix4d_step_1_ended', 'pix4d_step_1_status',
                  'pix4d_step_2_started', 'pix4d_step_2_ended', 'pix4d_step_2_status',
                  'pix4d_step_3_started', 'pix4d_step_3_ended', 'pix4d_step_3_status',
                  'post_pix4d_started', 'post_pix4d_ended', 'post_pix4d_status',
                  'current_start', 'current_step_name', 'next_step_names', 'last_step_name', 'latest_time',
                  'success_steps_count', 'failure_steps_count', 'remaining_steps_count',
                  'total_hours', 'latest_status', 'latitude', 'longitude')
        extra_kwargs = {
            'url': {'view_name': 'flighttracker-detail'}
        }
