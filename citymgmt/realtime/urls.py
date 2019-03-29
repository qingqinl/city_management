from django.urls import path

from .views import HomePageView, RealTimePollutionView

urlpatterns = [
	path('pollution/', RealTimePollutionView.as_view(), name = 'realtimepollution'),
	path('', HomePageView.as_view(), name = 'home'),
]