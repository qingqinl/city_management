import db

bike_data = db.get_bike_data()
bus_data = db.get_bus_data()
pol_data = db.get_pollution_data()
event_data = db.get_event_data()
traffic_data = db.get_traffic_data()

#tables = ['name','lat', 'lng', 'bike_stands', 'available_bike_stands', 'available_bikes']
#db.create_db_tables('bike', 'dublin_bike', bike_data)
#db.create_db_tables('bus_stations', 'station_data', bus_data)
#db.create_db_tables('pollution', 'pol_data', pol_data)
#db.create_db_tables('events', 'event_data', event_data)
db.create_db_tables('traffic', 'traffic_data', traffic_data)

