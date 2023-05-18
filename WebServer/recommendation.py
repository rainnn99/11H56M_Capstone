import pandas as pd
import numpy as np
import mysql.connector
import random

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # 비밀번호
    database="food_recommendation"
)

mycursor = mydb.cursor()

food_data = pd.read_csv('food.csv')

#부족한 영양정보 제공을위한 배열
plethora = []

#싫어하는 음식을 추천하지 않기위해 데이터 받아오기
def get_dislike_food(userid):
    query = f"SELECT food_small_scale_classification FROM dislike_food WHERE customer_id = '{userid}'"
    mycursor.execute(query)
    dislike_food = mycursor.fetchall()
    convert_data = [item[0] for item in dislike_food]
    return convert_data

#mysql의 testdb의 calender table에서 user_id collum을 확인하여 최근 30개를 가져와 user_taken_food 변수에 저장하는 코드

def get_taken_food(userid):
    query = f"SELECT taken_food FROM calender WHERE user_id = '{userid}' ORDER BY day DESC LIMIT 30"
    mycursor.execute(query)
    taken_food = mycursor.fetchall()
    return taken_food

#사용자가 지난 15일간 먹었던 음식의 영양정보를 food.csv에서 읽어옴
def get_taken_food_nutr(taken_food):
    matched_rows = food_data[food_data['food_small_scale_classification'].isin([x[0] for x in taken_food])].values.tolist()

#영양정보만 남겨 활용하기 위해 앞의 food_no~food_small_scale_classifiction까지 절삭
#알고리즘만 구현하기위해 일단 serving_size까지 절삭 했으나 추후 servingsize를 계산에 추가하여 대략적인 섭취량 계산 가능하도록 코드추가
    matched_rows_modified = [row[5:] for row in matched_rows]
    return matched_rows_modified

def get_nut(matched_rows_modified):
#대략적인 섭취 영양 계산
    take_nut_sums = np.sum(matched_rows_modified, axis=0)
    take_nut_sums = take_nut_sums.reshape(1, -1)

#칼로리, 나트륨 섭취량 분리 후 배열 절삭
    take_nut_sums = take_nut_sums[0]
    calories = take_nut_sums[0]
    salt = take_nut_sums[4]
    take_nut_sums = take_nut_sums[1:4]

#영양소에 기반한 추천을 하기위한 섭취 영양 비율 계산(가장 많이 섭취된 영양기준 부족한 정도)
#기준 : 보건복지부 권장 섭취 에너지 비율(탄:55-65%, 단:7-20%, 지:15-30)
#단 계산의 편의를 위해 탄단지의 비율을 60:15:25로 계산
    target_ratios = np.array([15, 25, 60])
    take_nut_ratio = take_nut_sums / np.sum(take_nut_sums) * 100
    lack_ratio = target_ratios - take_nut_ratio

#부족한 영양 정보 제공을 위한 값 확인 함수(비율기준 음수이면 특정영양이 다른 영양보다 많이 섭취되었다는 뜻이므로)
    for index, value in enumerate(lack_ratio):
        if value > 0:
            plethora.append(index)
            
    lack_ratio = lack_ratio.astype(int)
    return lack_ratio

def remove_dislike_food(recommand, dislike):
    recommand_filtered = [item for item in recommand if item not in dislike]
    return recommand_filtered
    
# 부족한 영양소를 보완하는 음식 추천 함수(Knowledge-based Recommendation 사용)
def recommend_food(taken_food, deficient_nutrients, lack_ratio, food_data, dislike_food, number=10):
    # 사용자의 최근 식사한 음식 데이터로 필터링
    filtered_foods = food_data[food_data['food_small_scale_classification'].isin(taken_food)]

    # 필터링된 음식에 대해 부족한 영양소 계산
    nutrient_deficiencies = {}
    for nutrient, level in zip(deficient_nutrients, lack_ratio):
        nutrient_sum = filtered_foods[nutrient].sum()
        #부족한 영양에 가중치 추가
        nutrient_deficiencies[nutrient] = (level - nutrient_sum) * (1 + lack_ratio)

    # 부족한 영양소를 보완하는 음식 추천
    recommended_foods = []
    for nutrient in nutrient_deficiencies:
        if nutrient_deficiencies[nutrient].any() > 0:
            foods = food_data[food_data[nutrient] > 0]  # 해당 영양소를 가지고 있는 음식 필터링
            top_foods = foods.nlargest(number, nutrient)['food_small_scale_classification'].tolist()
            recommended_foods.extend(top_foods)

    #싫어하는 음식 삭제
    final_recommended_foods = remove_dislike_food(recommended_foods, dislike_food)
    # 다양한 음식을 추천하기 위해 추천 음식 중 랜덤으로 선택
    random.shuffle(final_recommended_foods)
    final_recommended_foods = final_recommended_foods[:number]

    return final_recommended_foods
    
# 음식 추천 실행
def run_recommendation(userid):
    taken_food = get_taken_food(userid)
    taken_nutr = get_taken_food_nutr(taken_food)
    lack_ratio = get_nut(taken_nutr)
    dislike_food = get_dislike_food(userid)
    deficient_nutrients = ['protein_g', 'fat_g', 'carbohydrate_g']
    recommended_foods = recommend_food(taken_food, deficient_nutrients, lack_ratio, food_data, dislike_food)
    print(dislike_food)
    print(recommended_foods)
    return recommended_foods

mycursor.close()