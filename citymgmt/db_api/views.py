from django.http import HttpResponse
from . import fetch_db as fd

def bike_api(request):
	json_resp = fd.fetch_db_api('rt_bike_db','bike_availability')
	return HttpResponse(json_resp)

def pollution_api(request):
	json_resp = fd.fetch_db_api('rt_pollution_db','pollution_level')
	return HttpResponse(json_resp)

def traffic_api(request):
	json_resp = fd.fetch_db_api('rt_traffic_db','traffic_info')
	return HttpResponse(json_resp)

def events_api(request):
	json_resp = fd.fetch_db_api('rt_events_db','event_info')
	return HttpResponse(json_resp)