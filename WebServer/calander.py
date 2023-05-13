#캘린더

import pandas as pd
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password=""  # 비밀번호
)

mycursor = mydb.cursor()

def recommandation():
    path = get_path()
    df = pd.read_csv(path)
    food_name = df['food_small_scale_classification'].tolist()

def get_foodinfo(food_list):
    #음식정보 받아오기/ csv파일에서 검색해서
    info_list = 0
    return info_list

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