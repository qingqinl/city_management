from django.urls import path

from .views import HomePageView, RealTimePollutionView, RealTimeBikeView, RealTimeEventView, TrafficView

urlpatterns = [
	path('pollution/', RealTimePollutionView.as_view(), name = 'realtimepollution'),
	path('traffic/', TrafficView.as_view(), name = 'realtimetraffic'),
	path('bikestatus/', RealTimeBikeView.as_view(), name = 'bikestatus'),
	path('events/', RealTimeEventView.as_view(), name = 'events'),
	path('', HomePageView.as_view(), name = 'home'),
]