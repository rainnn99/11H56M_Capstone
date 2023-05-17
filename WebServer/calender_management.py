#캘린더
import recommendation
import pandas as pd
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="food_recommendation"
)
mycursor = mydb.cursor()
food_data = pd.read_csv('food.csv')

def insert_eat_food(date, userid, food_name):
    query = "INSERT INTO calender (user_id, day, taken_food) VALUES (%s, %s, %s)"
    values = (userid, date, food_name)
    mycursor.execute(query, values)
    mydb.commit()

#DB의 calander에서 고객이 먹은 식사 데이터 받아오기
def get_foodinfo(date, userid):
    yearmonth = int(date)
    query_calendar = f"SELECT day, taken_food FROM calender WHERE user_id = '{userid}'"
    mycursor.execute(query_calendar)
    rows_calendar = mycursor.fetchall()
    month_data = []
    for row in rows_calendar:
        if row[0]/100 == yearmonth/100:
            month_data.append((row, row[1]))
    return month_data

#받아온 음식 데이터에서 이름을 추출해 food 테이블에서 영양 정보를 가져오기
def get_foodnut(month_data):
    month_eat_foods = food_data[food_data['food_small_scale_classification'].isin([data[1] for data in month_data])].values.tolist()
    sliceing_buffer = [row[3:] for row in month_eat_foods]
    month_eat_foods_info = [row[:1] + row[2:] for row in sliceing_buffer]
    return month_eat_foods_info

def run_calender_get(date, userid):
    month_data = get_foodinfo(date, userid)
    foodinfo = get_foodnut(month_data)
    print(foodinfo)
    return foodinfo

def run_calender_insert(date, userid, taken_food):
    insert_eat_food(date, userid, taken_food)
    
mycursor.close()
mydb.close()

