from django.urls import path

from .views import PopulationPredictionView

urlpatterns = [
    path('population_prediction/', PopulationPredictionView.as_view(), name='PopulationPrediction'),
]
