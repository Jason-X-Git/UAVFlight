from rest_framework import serializers
from flighttracker.models import UAVFlight


class UAVFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = UAVFlight
        fields = ('id', 'uav_no', 'grs_job_no', 'job_desc', 'comments', 'pix4d_step_1_started', 'pix4d_step_1_ended',
                  'pix4d_step_2_started', 'pix4d_step_2_ended', 'current_start')
