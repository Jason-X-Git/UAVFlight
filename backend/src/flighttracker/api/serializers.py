from rest_framework import serializers
from flighttracker.models import UAVFlight


class UAVFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UAVFlight
        fields = ('id', 'uav_no', 'grs_job_no', 'job_desc', 'comments',
                  'transfer_started', 'transfer_ended',
                  'pix4d_step_1_started', 'pix4d_step_1_ended',
                  'pix4d_step_2_started', 'pix4d_step_2_ended',
                  'pix4d_step_3_started', 'pix4d_step_3_ended',
                  'post_pix4d_started', 'post_pix4d_ended',
                  'current_start', 'current_step_name', 'next_step_names', 'last_step_name')
