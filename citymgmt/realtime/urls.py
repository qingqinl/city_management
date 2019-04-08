from django.urls import path

from .views import HomePageView, RealTimePollutionView, RealTimeBikeView, RealTimeEventView

urlpatterns = [
	path('pollution/', RealTimePollutionView.as_view(), name = 'realtimepollution'),
	path('bikestatus/', RealTimeBikeView.as_view(), name = 'bikestatus'),
	path('events/', RealTimeEventView.as_view(), name = 'events'),
	path('', HomePageView.as_view(), name = 'home'),
]