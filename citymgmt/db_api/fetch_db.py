from . import db
import json

def fetch_db_api(db_file, table):
	api_data = []
	rows = db.get_all_data(db_file, table)
	cols = db.get_columns(db_file, table)
	for row in rows:
		data = {}
		for key, val in zip(cols, row):
			data[key] = val
		api_data.append(data)
	rs = json.dumps(api_data)
	return rs