import db

#rows = db.get_all_data('bike', 'dublin_bike')
#rows = db.get_all_data('rt_bike', 'dublin_bike')

#rows = db.get_all_data('pollution', 'pol_data')
#rows = db.get_all_data('rt_pollution', 'pol_data')

#db.select_all_tasks('bus_stations', 'station_data')
#rows = db.get_all_data('events', 'event_data')
rows = db.get_all_data('traffic', 'traffic_data')
#print(len(rows))

for row in rows:
	print(row)