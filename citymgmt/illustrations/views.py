from django.views.generic import TemplateView

# Create your views here.

class PopulationPredictionView(TemplateView):
	template_name = 'population_prediction.html'

class BikePredictionView(TemplateView):
	template_name = 'bike_prediction.html'

class PollutionPredictionView(TemplateView):
	template_name = 'pollution_prediction.html'

class PollutionPopulationCorrelationView(TemplateView):
	template_name = 'correlation_pp.html'

class PollutionBikeCorrelationView(TemplateView):
	template_name = 'correlation_pb.html'
