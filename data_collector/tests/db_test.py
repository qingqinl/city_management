import db

def test_create_db(db_file, table, column_data):
	db.delete_db_table(db_file, table)
	db.create_db_tables(db_file, table, column_data)
	columns = db.get_columns(db_file, table)
	c_list = [column for column in column_data]
	assert columns == ['index_id','timestamp'] + c_list

def test_read_write_db(db_file, table, data):
	db.write_to_db(db_file, table, data)
	rows = db.get_all_data(db_file, table)
	assert rows[0][2] == 'REAL'
	assert rows[0][3] == 'REAL'
	assert rows[0][4] == 'TEXT'

if __name__ == "__main__":
	db_file = 'test_db'
	table = 'test_table'
	test_data = db.get_test_data()
	test_create_db(db_file, table, test_data)
	test_read_write_db(db_file, table, test_data)
	print("Tests Passed")