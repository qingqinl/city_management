from django.views.generic import TemplateView

# Create your views here.

class PopulationPredictionView(TemplateView):
	template_name = 'population_prediction.html'

class BikePredictionView(TemplateView):
	template_name = 'bike_prediction.html'

class PollutionPredictionView(TemplateView):
	template_name = 'pollution_prediction.html'
