import db
import data_fetching as df
import data_processor as dp
import time
import datetime

def create_tables(db_file, tables_data):
	for table in tables:
		print(table, tables_data[table])
		db.create_db_tables(db_file, table, tables_data[table])


bike_data = db.get_bike_data()
pollution_data = db.get_pollution_data()
event_data = db.get_event_data()
traffic_data = db.get_traffic_data()

database_file = "../citymgmt/mobility_db"

tables = ['bike_availability', 'pollution_level', 'traffic_info','event_info']
rt_db_files = ['../citymgmt/rt_bike_db', '../citymgmt/rt_pollution_db', '../citymgmt/rt_traffic_db','../citymgmt/rt_events_db']

tables_data = {tables[0]:bike_data, tables[1]:pollution_data, tables[2]:traffic_data, tables[3]:event_data}
tables_db = {tables[0]:rt_db_files[0], tables[1]:rt_db_files[1], tables[2]:rt_db_files[2], tables[3]:rt_db_files[3]}

create_tables(database_file, tables_data)

df.fetch_bike_api_data(database_file, tables[0], rt_db_files[0])
#df.fetch_pollution_api_data(database_file, tables[1], latlonid[0], latlonid[1], latlonid[2], rt_db_files[1])
#df.fetch_traffic_api_data(database_file, tables[2], latlonid[0], lat, lon, latlonid[1], latlonid[2], rt_db_files[2])

bike_db_file = rt_db_files[0]
lat = db.read_column_from_db(bike_db_file,'lat','bike_availability')
lon = db.read_column_from_db(bike_db_file,'lng','bike_availability')
bid = db.read_column_from_db(bike_db_file, 'number', 'bike_availability')
coord = (bid, lat, lon)
latlonid = dp.clean_lat_lon_id(coord)

start_time = time.time()
max_date = datetime.datetime.utcfromtimestamp(start_time).date()
lat = str(53.344352)
lon = str(-6.258456)
key_itr = 0
while True:
	current_time = time.time()
	current_date = datetime.datetime.utcfromtimestamp(current_time).date()
	df.fetch_bike_api_data(database_file, tables[0], rt_db_files[0])
	df.fetch_pollution_api_data(database_file, tables[1], latlonid[0], latlonid[1], latlonid[2], rt_db_files[1], key_itr)
	key_itr += 1
	df.fetch_traffic_api_data(database_file, tables[2], latlonid[0], lat, lon, latlonid[1], latlonid[2], rt_db_files[2])
	if current_date == max_date:
		max_date = current_date
		df.fetch_events_api_data(database_file, tables[3], lat, lon, rt_db_files[3])
	print('Completed', key_itr)
	time.sleep(60)