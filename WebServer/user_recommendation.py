import recommendation
import pandas as pd
import mysql.connector
import random

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="food_recommendation"
)
mycursor = mydb.cursor()

# 데이터베이스에서 모든 food_small_scale_classification 값 가져오기
query = "SELECT DISTINCT food_small_scale_classification FROM food"
mycursor.execute(query)
results = mycursor.fetchall()

#사용자 id 받아와야함
user_id = ""
#받아온 id 전달 코드

def get_username():
    return user_id

def get_userdata(name):
    query = "SELECT * FROM dislike_food WHERE customer_id = 'c_id'"
    mycursor.execute(query)
    result = mycursor.fetchall()
    return result

def user_recommandation(name):
    dislike = get_userdata(name)
    #recommandation과 dislike배열을 비교하여 같은항목을 제거하는 코드 -> recommendation으로 넘길 생각중
    #목적 : 추천 결과 배열에서 dislike와 겹치는거 하나씩 제거
    
    return 0
