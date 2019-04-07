from django.urls import path

from . import views

urlpatterns = [
    path('api/bike', views.bike_api, name='bike_api'),
    path('api/pollution', views.pollution_api, name='pollution_api'),
    path('api/traffic', views.traffic_api, name='traffic_info'),
    path('api/events', views.events_api, name='event_info'),
]
