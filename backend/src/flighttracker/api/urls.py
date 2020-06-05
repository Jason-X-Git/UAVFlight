from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('', UAVFlightViewSet, basename='flighttracker')
urlpatterns = router.urls
