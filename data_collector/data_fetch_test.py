import db
import data_fetching as df
import data_processor as dp

def test_bike_api(db_file, table, rt_db_file):
	rows_before_fetch = db.get_all_data(db_file, table)
	assert len(rows_before_fetch)%113 == 0
	df.fetch_bike_api_data(db_file, table, rt_db_file)
	rows_after_fetch = db.get_all_data(db_file, table)
	assert len(rows_after_fetch)%113 == 0
	assert len(rows_after_fetch) - len(rows_before_fetch) == 113
	rows_rt_fetch = db.get_all_data(rt_db_file, table)
	assert len(rows_rt_fetch) == 113


def test_pollution_api(db_file, table, rt_db_file):
	bike_db_file = "rt_bike_db"
	lat = db.read_column_from_db(bike_db_file,'lat','bike_availability')
	lon = db.read_column_from_db(bike_db_file,'lng','bike_availability')
	bid = db.read_column_from_db(bike_db_file, 'number', 'bike_availability')
	coord = (bid, lat, lon)
	latlonid = dp.clean_lat_lon_id(coord)
	rows_before_fetch = db.get_all_data(db_file, table)
	assert len(rows_before_fetch)%113 == 0
	df.fetch_pollution_api_data(db_file, table, latlonid[0], latlonid[1], latlonid[2], rt_db_file)
	rows_after_fetch = db.get_all_data(db_file, table)
	assert len(rows_after_fetch)%113 == 0
	assert len(rows_after_fetch) - len(rows_before_fetch) == 113
	rows_rt_fetch = db.get_all_data(rt_db_file, table)
	assert len(rows_rt_fetch) == 113


def test_traffic_api_data_distance():
	db_file = "rt_bike_db"
	lat = db.read_column_from_db(db_file,'lat','bike_availability')
	lon = db.read_column_from_db(db_file,'lng','bike_availability')
	bid = db.read_column_from_db(db_file, 'number', 'bike_availability')
	coord = (bid, lat, lon)
	latlonid = dp.clean_lat_lon_id(coord)

	lat = str(53.344352)
	lon = str(-6.258456)
	for x, i, j in zip(latlonid[0], latlonid[1], latlonid[2]):
		distance_data = dp.get_distance(lat, lon, i, j)
		assert type(distance_data) == int
		#print(distance_data)


def test_traffic_api(db_file, table, rt_db_file):
	bike_db_file = "rt_bike_db"
	lat = db.read_column_from_db(bike_db_file,'lat','bike_availability')
	lon = db.read_column_from_db(bike_db_file,'lng','bike_availability')
	bid = db.read_column_from_db(bike_db_file, 'number', 'bike_availability')
	coord = (bid, lat, lon)
	latlonid = dp.clean_lat_lon_id(coord)
	rows_before_fetch = db.get_all_data(db_file, table)
	assert len(rows_before_fetch)%113 == 0
	lat = str(53.344352)
	lon = str(-6.258456)
	df.fetch_traffic_api_data(db_file, table, latlonid[0], lat, lon, latlonid[1], latlonid[2], rt_db_file)
	rows_after_fetch = db.get_all_data(db_file, table)
	assert len(rows_after_fetch)%113 == 0
	assert len(rows_after_fetch) - len(rows_before_fetch) == 113
	rows_rt_fetch = db.get_all_data(rt_db_file, table)
	assert len(rows_rt_fetch) == 113


if __name__ == "__main__":
    test_bike_api('mobility_db', 'bike_availability', 'rt_bike_db')
    test_pollution_api('mobility_db', 'pol_data', 'rt_pollution')
    test_traffic_api_data_distance()
    test_traffic_api('mobility_db', 'traffic_data', 'rt_traffic')
    print("Tests Passed")