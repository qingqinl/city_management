from django.views.generic import TemplateView

# Create your views here.

class PopulationPredictionView(TemplateView):
	template_name = 'population_prediction.html'
