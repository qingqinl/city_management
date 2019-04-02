from django.views.generic import TemplateView

# Create your views here.


class HomePageView(TemplateView):
	template_name = 'home.html'

class RealTimePollutionView(TemplateView):
	template_name = 'realtimepollution.html'

class RealTimeBikeView(TemplateView):
	template_name = 'realtimebike.html'