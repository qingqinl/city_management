from django.urls import path

from .views import IllustrationsView

urlpatterns = [
    path('illustrations/', IllustrationsView.as_view(), name='illustrations'),
]
