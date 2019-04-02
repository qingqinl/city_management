from django.urls import path

from .views import HomePageView, RealTimePollutionView, RealTimeBikeView

urlpatterns = [
	path('pollution/', RealTimePollutionView.as_view(), name = 'realtimepollution'),
	path('bikestatus/', RealTimeBikeView.as_view(), name = 'bikestatus'),
	path('', HomePageView.as_view(), name = 'home'),
]