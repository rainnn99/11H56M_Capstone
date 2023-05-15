#음식추천 알고리즘만

import pandas as pd
import mysql.connector
import random

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
    database="food_recommendation"
)
mycursor = mydb.cursor()

# 데이터베이스에서 모든 food_small_scale_classification 값 가져오기
query = "SELECT DISTINCT food_small_scale_classification FROM your_table_name"
mycursor.execute(query)
results = mycursor.fetchall()

# 추천할 값 선택 ->일단 랜덤으로 만들어둠 알고리즘 만들어서 수정
recommendation = random.choice(results)[0]
print("추천: ", recommendation)

def get_userdata(name):
    query = "SELECT * FROM dislike_food WHERE customer_id = 'c_id'"
    mycursor.execute(query)
    result = mycursor.fetchall()
    return result

def recommandation(name):
    dislike = get_userdata(name)
    #recommandation과 dislike배열을 비교하여 같은항목을 제거하는 코드
    
    #추천 결과 배열에서 dislike와 겹치는거 하나씩 제거
    
    return 0


    
    






"""
import requests
import pandas as pd
import random
import os

API_KEY = 'f0580c8dab554611bfb576f9a3c7190c'

def get_path():
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'food.csv')

def get_random_recipe():
    url = f"https://api.spoonacular.com/recipes/random?apiKey={API_KEY}"
    return requests.get(url).json()['recipes'][0]

def recommend_food_from_csv(file_path):
    df = pd.read_csv(file_path)
    food_names = df['food_small_scale_classification'].tolist()
    random_food = random.choice(food_names)
    url = f"https://api.spoonacular.com/recipes/complexSearch?apiKey={API_KEY}&query={random_food}&number=1"
    data = requests.get(url).json()
    if 'results' in data and data['results']:
        recipe_id = data['results'][0]['id']
        recipe = get_recipe_by_id(recipe_id)
        return recipe['title']
    else:
        return "레시피를 찾을 수 없습니다."

def get_recipe_by_id(recipe_id):
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey={API_KEY}"
    return requests.get(url).json()

recommended_food = recommend_food_from_csv(get_path())
print(recommended_food)

"""