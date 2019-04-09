from django.http import HttpResponse
#from . import fetch_db as fd
from .models import BikeAvailability, PollutionLevel, TrafficInfo, EventInfo
import json
import time
import datetime

def fetch(cols, rows):
	api_data = []
	t2 = 0
	t1 = time.time()
	
	for row in rows:
		data = {}
		write_flag = False
		for key, val in zip(cols, row):
			if key == "timestamp":
				t2 = datetime.datetime.utcfromtimestamp(float(val)).date()
			if t2 == datetime.datetime.utcfromtimestamp(t1).date():
				write_flag = True
				data[key] = val
		if(write_flag):
			api_data.append(data)
	rs = json.dumps(api_data)
	#with open('pollution.json', 'w') as outfile:
	#	json.dump(api_data, outfile)
	return rs


def bike_api(request):
	vals = BikeAvailability.objects.values_list()
	lvals = list(vals)
	check = lvals[-1:][0][0]
	print(check, check%113)
	if check%113 != 0:
		time.sleep(3)
		bike_api(request)
	rows = lvals[-113:]
	cols = [f.name for f in BikeAvailability._meta.get_fields()]
	json_resp = fetch(cols, rows)
	return HttpResponse(json_resp)


def pollution_api(request):
	vals = PollutionLevel.objects.values_list()
	lvals = list(vals)
	check = lvals[-1:][0][0]
	print(check, check%113)
	if check%113 != 0:
		time.sleep(3)
		pollution_api(request)
	rows = lvals[-113:]
	cols = [f.name for f in PollutionLevel._meta.get_fields()]
	json_resp = fetch(cols, rows)
	return HttpResponse(json_resp)


def traffic_api(request):
	vals = TrafficInfo.objects.values_list()
	lvals = list(vals)
	check = lvals[-1:][0][0]
	print(check, check%113)
	if check%113 != 0:
		time.sleep(3)
		traffic_api(request)
	rows = lvals[-113:]
	cols = [f.name for f in TrafficInfo._meta.get_fields()]
	json_resp = fetch(cols, rows)
	return HttpResponse(json_resp)


def events_api(request):
	vals = EventInfo.objects.values_list()
	lvals = list(vals)
	rows = lvals[-35:]
	rows = list(dict.fromkeys(rows))
	print(rows)
	cols = [f.name for f in EventInfo._meta.get_fields()]
	json_resp = fetch(cols, rows)
	return HttpResponse(json_resp)