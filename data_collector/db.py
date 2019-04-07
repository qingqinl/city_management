import sqlite3
import time


def generate_sql_write(dic, table):
    key = dic.keys()
    value = dic.values()
    keys = list(key)
    values = list(value)
    query = "INSERT INTO " + table + " ( timestamp, "
    for key in keys:
        query += key + ","
    t = time.time()
    query = query[:-1] + ") VALUES ( "+str(t)+","
    for value in values:
        if value is None:
            value = 0.0
        if type(value) == str:
            query += "\"" + str(value) + "\","
        else:
            query += str(value) + ","
    query = query[:-1] + ")"
    #print(query)
    return query

def write_to_db(sqlite_file, table, data):
    conn = sqlite3.connect('{}.sqlite'.format(sqlite_file))
    cursor = conn.cursor()
    sql_query = generate_sql_write(data, table)
    cursor.execute(sql_query)
    conn.commit()
    conn.close()


def get_bike_data():
    d = {'number':"REAL",
         'name':"TEXT",
         'lat': "REAL",
         'lng': "REAL",
         'bike_stands': "REAL",
         'available_bike_stands': "REAL",
         'available_bikes': "REAL"}
    return d

def get_bus_data():
    d = {'id': "REAL",
         'lat': "REAL",
         'lon': "REAL",
         'name': "TEXT",
         'network': "TEXT",
         'route_ref': "TEXT",
         'ref': "REAL",
         'bench': "TEXT",
         'lit': "TEXT"}
    return d

def get_pollution_data():
    d = {
        'number':"REAL",
        'aqi':"REAL",
        "dominant_pollutant":"TEXT",
        "co":"REAL",
        "no2":"REAL",
        "o3":"REAL",
        "so2": "REAL",
        "pm10": "REAL",
        "pm25": "REAL"
    }
    return d

def get_event_data():
    d = {'name':"TEXT",
         'address_1':"TEXT",
         'time': "TEXT",
         'duration':"TEXT",
         'lat':"REAL",
         'lon':"REAL",
         'yes_rsvp_count':"REAL",
         'maybe_rsvp_count':"REAL"
         }
    return d

def get_traffic_data():
    d = {'number':"REAL",
         'distance':"REAL",
         'duration':"REAL"}
    return d

def get_test_data():
    d = {'id':"REAL",
         'test1':"REAL",
         'test2':"TEXT"}
    return d


def generate_sql_create(dic, table):
    key = dic.keys()
    keys = list(key)
    query = "CREATE TABLE " + table + " ( index_id integer PRIMARY KEY, timestamp TEXT,"
    for key in keys:
        query += key+ " " + dic[key] + ","
    query = query[:-1] + ")"
    print(query)
    return query

def create_db_tables(sqlite_file, table, scrip_code):
    conn = sqlite3.connect('{}.sqlite'.format(sqlite_file))
    cursor = conn.cursor()
    #scrip_code = get_base_quotes()
    sql_query = generate_sql_create(scrip_code, table)
    cursor.execute(sql_query)
    conn.commit()
    conn.close()

def verify(sqlite_file):
    con = sqlite3.connect('{}.sqlite'.format(sqlite_file))
    cursor = con.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    for i in tables:
        print(i)

def get_columns(sqlite_file, table):
    cur = select_all_tasks(sqlite_file, table)
    columns = []
    for i in cur.description:
        columns.append(i[0])
    return columns
    #print(i[0], end=' ')


def get_all_data(sqlite_file, table):
    cur = select_all_tasks(sqlite_file, table)
    rows = cur.fetchall()
    return rows


def select_all_tasks(sqlite_file, table):
    conn = sqlite3.connect('{}.sqlite'.format(sqlite_file))
    cur = conn.cursor()
    cur.execute("SELECT * FROM "+table)
    return cur

def read_column_from_db(sqlite_file, column, table):
    conn = sqlite3.connect('{}.sqlite'.format(sqlite_file))
    cur = conn.cursor()
    vals = [val[0] for val in cur.execute("SELECT " +column+ " FROM "+table)]
    return vals

def delete_db_table(sqlite_file, table):
    conn = sqlite3.connect('{}.sqlite'.format(sqlite_file))
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS "+table)

def update_realtime_db(sqlite_file, table, data):
    delete_db_table(sqlite_file, table)
    create_db_tables(sqlite_file, table, data)