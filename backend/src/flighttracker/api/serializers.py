from rest_framework import serializers
from flighttracker.models import UAVFlight


class UAVFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UAVFlight
        fields = ('id', 'uav_no', 'grs_job_no', 'job_desc', 'comments',
                  'transfer_started', 'transfer_ended',
                  'pix4d_step_1_started', 'pix4d_step_1_ended',
                  'pix4d_step_2_started', 'pix4d_step_2_ended',
                  'current_start', 'current_step_name', 'next_step_name', 'last_step_name')
