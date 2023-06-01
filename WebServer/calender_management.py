import pandas as pd
import mysql.connector
import json
import datetime
from flask import session, request

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
    database="capstone_11h56m"
)
mycursor = mydb.cursor()
food_data = pd.read_csv('../food.csv')

def insert_eat_food(date, userid, food_name, time):
    query = "INSERT INTO calender (user_id, day, taken_food, time) VALUES (%s, %s, %s, %s)"
    values = (userid, date, food_name, time)
    mycursor.execute(query, values)
    mydb.commit()

def update_eat_food(date, userid, food_name, time):
    query = "UPDATE calender SET taken_food = %s WHERE user_id = %s AND day = %s AND time = %s"
    values = (food_name, userid, date, time)
    mycursor.execute(query, values)
    mydb.commit()

def is_eat_food_exist(date, userid, time):
    query = "SELECT COUNT(*) FROM calender WHERE user_id = %s AND day = %s AND time = %s"
    values = (userid, date, time)
    mycursor.execute(query, values)
    result = mycursor.fetchone()
    count = result[0]
    return count > 0

def get_monthfoodinfo(date, userid):
    year = int(date[:4])
    month = int(date[5:])
    year_month = f"{year}-{month:02d}"
    query_calendar = f"SELECT day, taken_food, time FROM calender WHERE user_id = '{userid}' AND DATE_FORMAT(day, '%Y-%m') = '{year_month}'"
    mycursor.execute(query_calendar)
    rows_calendar = mycursor.fetchall()
    rows_calendar = [[item[0].strftime('%Y-%m-%d'), item[1], item[2]] for item in rows_calendar]
    sorted_array = sorted(rows_calendar, key=lambda x: x[0])
    return sorted_array

def get_foodcal(input):
    month_eat_foods = food_data[food_data['food_small_scale_classification'].isin([data[1] for data in input])].values.tolist()
    sliceing_buffer = [row[3:] for row in month_eat_foods]
    month_eat_foods_info = [row[:1] + row[2:3] for row in sliceing_buffer]
    return month_eat_foods_info

def merge_foodcal(monthfoodinfo, foodcal):
    merged_result = []
    for info in monthfoodinfo:
        merged_entry = info[:]
        for cal_info in foodcal:
            if info[1] == cal_info[0]:
                merged_entry.append(cal_info[1])
                break
        merged_result.append(merged_entry)
    return merged_result

def make_json(input):
    json_data = []
    for row in input:
        if len(row) >= 3:
            if len(row) == 3:
                json_row = {
                    "날짜": row[0],
                    "음식이름": row[1],
                    "시간": row[2],
                    "칼로리": 0
                }
            else:
                json_row = {
                    "날짜": row[0],
                    "음식이름": row[1],
                    "시간": row[2],
                    "칼로리": row[3]
                }
            json_data.append(json_row)
    return json.dumps(json_data, indent=4, ensure_ascii=False)

def run_calender_get(userid, date):
    month_data = get_monthfoodinfo(date, userid)
    month_food_info = get_foodcal(month_data)
    return_arr = merge_foodcal(month_data, month_food_info)
    return_json = make_json(return_arr)
    return return_json

def run_calender_insert(userid):
    data = request.json
    date = data['날짜']
    success = True
    
    if '음식이름1' in data:
        breakfast = data['음식이름1']
        try:
            if not is_eat_food_exist(date, userid, 1):
                insert_eat_food(date, userid, breakfast, 1)
            else:
                update_eat_food(date, userid, breakfast, 1)
        except Exception as e:
            print("Query execution failed:", str(e))
            success = False
    
    if '음식이름2' in data:
        lunch = data['음식이름2']
        try:
            if not is_eat_food_exist(date, userid, 2):
                insert_eat_food(date, userid, lunch, 2)
            else:
                update_eat_food(date, userid, lunch, 2)
        except Exception as e:
            print("Query execution failed:", str(e))
            success = False
    
    if '음식이름3' in data:
        dinner = data['음식이름3']
        try:
            if not is_eat_food_exist(date, userid, 3):
                insert_eat_food(date, userid, dinner, 3)
            else:
                update_eat_food(date, userid, dinner, 3)
        except Exception as e:
            print("Query execution failed:", str(e))
            success = False
    
    return success
