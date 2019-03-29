import db
import data_fetching as df


def clean_lat_lon_id(coord):
	latlonid = ([],[],[])
	itr = 0
	for l in coord:
		for c in l:
			if c != '':
				latlonid[itr].append(str(c))
		itr += 1
	return latlonid


def get_distance(lat1, lon1, lat2, lon2):
	traffic_data = df.get_traffic_api_data(lat1, lon1, lat2, lon2)
	return traffic_data['distance']