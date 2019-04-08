import requests
import json
import db


def get_response(api_link):
	response = requests.get(api_link)
	response_content = response.content
	data = json.loads(response_content)
	return data


def fetch_bike_api_data(db_file, table):
	bike_key = "5a9fca8c93d0a38ba40af732c366af7863d6f8c5"
	
	bike_api = "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey="+bike_key
	data = get_response(bike_api)
	bike_data = db.get_bike_data()
	#db.update_realtime_db(rt_db_file, table, bike_data)
	for i in data:
		for key in bike_data:
			if key not in i:
				bike_data[key] = i['position'][key]
			else:
				bike_data[key] = i[key]
		db.write_to_db(db_file, table, bike_data)
		#db.write_to_db(rt_db_file, table, bike_data)


def fetch_pollution_api_data(db_file, table, bid, lat, lon, key_itr):
	pollution_data = db.get_pollution_data()
	#db.update_realtime_db(rt_db_file, table, pollution_data)
	for x, lt, ln in zip(bid, lat, lon):
		if key_itr%2 == 0:
			pollution_key = "8c970d0f7c3c48c5944b94de6aeb1e96"
		else:
			pollution_key = "b5130bf2c1974aa9929e240212237a6c"
			
		
		#pollution_key = "b5130bf2c1974aa9929e240212237a6c"
		
		pollution_api = "https://api.breezometer.com/air-quality/v2/current-conditions?lat="+lt+"&lon="+ln+"&key="+pollution_key+"&features=breezometer_aqi,pollutants_concentrations"
		data =  get_response(pollution_api)
		
		#print(data)
		if data['data']['data_available']:
			for i in data['data']['indexes']['baqi']:
				for key in pollution_data:
					if i in key:
						pollution_data[key] = data['data']['indexes']['baqi'][key]

			for i in data['data']['pollutants']:
				for key in pollution_data:
					if i in key:
						pollution_data[key] = data['data']['pollutants'][key]['concentration']['value']
		pollution_data['number'] = x
		pollution_data['lat'] = lt
		pollution_data['lng'] = ln
		db.write_to_db(db_file, table, pollution_data)
		#db.write_to_db(rt_db_file, table, pollution_data)


def fetch_events_api_data(db_file, table, lat, lon):
	event_key = "sig_id=239072385&sig=7c49a476cedde45274f33d3cc95137d5478346c3";
	events_api = "https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon="+lon+"&limited_events=False&photo-host=public&page=20&radius=25.0&lat="+lat+"&desc=False&status=upcoming&"+event_key

	data = get_response(events_api)
	events_data = db.get_event_data()
	#db.update_realtime_db(rt_db_file, table, events_data)
	to_write_data = events_data
	for i in data['results']:
		if 'venue' in i and 'Dublin' in i['venue']['city']:
			#print(i['venue']['city'])
			for key in events_data:
				if key in i:
					events_data[key] = i[key]
				else:
					if 'venue' in i and key in i['venue']:
						events_data[key] = i['venue'][key]
						if key == 'time':
							events_data[key] = str(events_data[key])[:10]

			db.write_to_db(db_file, table, events_data)
			#db.write_to_db(rt_db_file, table, events_data)


def get_traffic_api_data(lat1, lon1, lat2, lon2):
	#traffic_key = "AIzaSyDw_4KBxuugz-NrA4vZ1_ndRfE_TQ7Ynvg"
	traffic_key = "AIzaSyCq8KVO9ZOjpFh0zVIO945FB_4fQ3JrxT4"
	traffic_api = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+lat1+","+lon1+"&destinations="+lat2+","+lon2+"&key="+traffic_key
	data = get_response(traffic_api)
	#print(data)
	traffic_data = db.get_traffic_data()
	for i in data['rows']:
		for j in i['elements']:
			for key in traffic_data:
				if key in j:
					traffic_data[key] = j[key]['value']
	#print(traffic_data)
	return traffic_data


def fetch_traffic_api_data(db_file, table, bid, lat1, lon1, lat2, lon2):
	traffic_data = db.get_traffic_data()
	#db.update_realtime_db(rt_db_file, table, traffic_data)
	for x, i, j in zip(bid, lat2, lon2):
		traffic_data = get_traffic_api_data(lat1, lon1, i, j)
		traffic_data['number'] = x
		db.write_to_db(db_file, table, traffic_data)
		#db.write_to_db(rt_db_file, table, traffic_data)