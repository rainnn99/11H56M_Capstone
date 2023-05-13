#음식추천 알고리즘만

import pandas as pd
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="food_recommendation"
)
mycursor = mydb.cursor()

def get_userdata(name):
    #customer_id로 식별 필요
    mycursor.execute("SELECT food_small_scale_classification from dislike_food")
    result = mycursor.fetchone()
    return result
    

def recommandation(name):
    dislike = get_userdata(name)
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