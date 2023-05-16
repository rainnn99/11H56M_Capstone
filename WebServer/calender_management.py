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

def insertEatFood():
    #이하 두줄 입력받아 calander DB에 삽입
    date = "YYYYMMDD"
    food_small_scale_classification = "aaaaa"

    # 데이터베이스에 데이터 삽입
    query = "INSERT INTO calendar (date, food_small_scale_classification) VALUES (%s, %s)"
    values = (date, food_small_scale_classification)
    mycursor.execute(query, values)
    mydb.commit()
    mycursor.close()
    

#DB의 calander에서 고객이 먹은 식사 데이터 받아오기
def get_foodinfo(yearmonth):
    query_calendar = "SELECT day, food_small_scale_classification FROM calendar"
    mycursor.execute(query_calendar)
    rows_calendar = mycursor.fetchall()
    month_data = []
    for row in rows_calendar:
        day = row[0].strftime("%Y%m")
        if day[:6] == yearmonth[:6]:
            month_data.append((day, row[1]))
    return month_data

#받아온 음식 데이터에서 이름을 추출해 food 테이블에서 영양 정보를 가져오기
def get_foodnut(month_data):
    month_eat_foods_info = food_data[food_data['food_small_scale_classification'].isin([data[1] for data in month_data])]
    return month_eat_foods_info

"""
def push_plethora():
    plethora = recommendation.plethora_info()
    #프론트 캘린더로 push
    #주간, 월간 반영 가능
""" 

#캘린더에서 요청이 들어오면 yearmonth값 받아 함수들 실행 및 데이터 전송하는 코드 필요(한달단위 예정)
#주간단위나 일간단위 영양정보 관리 기능 필요시 코드 추가
    
    
mycursor.close()
mydb.close()

