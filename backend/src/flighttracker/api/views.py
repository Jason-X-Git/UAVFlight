from rest_framework import viewsets
from flighttracker.models import UAVFlight
from .serializers import UAVFlightSerializer


class UAVFlightViewSet(viewsets.ModelViewSet):
    queryset = UAVFlight.objects.all()
    serializer_class = UAVFlightSerializer
