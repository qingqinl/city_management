from django.urls import path

from .views import PopulationPredictionView, BikePredictionView, PollutionPredictionView,PollutionPopulationCorrelationView, PollutionBikeCorrelationView

urlpatterns = [
    path('populationprediction/', PopulationPredictionView.as_view(), name='PopulationPrediction'),
    path('bikeprediction/', BikePredictionView.as_view(), name='BikePrediction'),
    path('pollutionprediction/', PollutionPredictionView.as_view(), name='PollutionPrediction'),
    path('pollutionpopulationcorrelation/', PollutionPopulationCorrelationView.as_view(), name='PollutionPopulationCorrelation'),
    path('pollutionbikecorrelation/', PollutionBikeCorrelationView.as_view(), name='PollutionBikeCorrelation'),
]
