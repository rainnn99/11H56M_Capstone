#캘린더

import pandas as pd
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="food_recommendation"
)

def insertEatFood():
    mycursor = mydb.cursor()
    #이하 두줄 입력받아 calander DB에 삽입
    date = "YYYY_MM-DD"
    food_small_scale_classification = "aaaaa"

    # 데이터베이스에 데이터 삽입
    query = "INSERT INTO calendar (date, food_small_scale_classification) VALUES (%s, %s)"
    values = (date, food_small_scale_classification)
    mycursor.execute(query, values)
    mydb.commit()
    mycursor.close()
    

#DB의 calander에서 고객이 먹은 식사 데이터 받아오기
def get_foodinfo():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT day, food_small_scale_classification FROM calander")

    result = mycursor.fetchall()

    #배열로 정보 저장
    data = [row for row in result]

    mycursor.close()
    mydb.close()

    return data

"""
def gett_foodinfo(food_list):
    #DB에서 음식정보 받아오기
    info_list = 0
    return info_list\
"""

#사용자별로 한달어치의 데이터를 한번에 받아와서 발송하도록 변경예정    
"""
def calander_data():
    info_day = "날짜 받아오기"
    info_food = "음식 받아오기"
    
    year = info_day[0:4]
    month = info_day[4:6]
    day = info_day[6:8]
    
    food_result = get_foodinfo(info_food)
    return food_result
    
def push_info():
    # calander_data() 에서 정보받아서 프론트로 push
    return 0
"""