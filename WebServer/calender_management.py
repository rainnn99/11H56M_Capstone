#캘린더
import pandas as pd
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
    database="testdb"
)
mycursor = mydb.cursor()
food_data = pd.read_csv('food.csv')

def insert_eat_food(date, userid, food_name, time):
    query = "INSERT INTO calender (user_id, day, taken_food, time) VALUES (%s, %s, %s, %s)"
    values = (userid, date, food_name, time)
    mycursor.execute(query, values)
    mydb.commit()

#DB의 calander에서 고객이 먹은 월간식사 데이터 받아와 날짜별로 정렬후 return
def get_monthfoodinfo(date, userid):
    yearmonth = int(date)
    query_calendar = f"SELECT day, taken_food, time FROM calender WHERE user_id = '{userid}' AND SUBSTRING(CAST(day AS CHAR), 1, 6) = '{yearmonth}'"
    mycursor.execute(query_calendar)
    rows_calendar = mycursor.fetchall()
    rows_calendar = [list(i) for i in rows_calendar]
    sorted_array = sorted(rows_calendar, key=lambda x: x[0])
    return sorted_array

#받아온 음식 데이터에서 이름을 추출해 food 테이블에서 칼로리 정보 가져오기
def get_foodcal(input):
    month_eat_foods = food_data[food_data['food_small_scale_classification'].isin([data[1] for data in input])].values.tolist()
    sliceing_buffer = [row[3:] for row in month_eat_foods]
    month_eat_foods_info = [row[:1] + row[2:3] for row in sliceing_buffer]
    return month_eat_foods_info

#월간 식사 데이터와 cal정보를 가져와 음식이름을 비교하여 같은 경우 cal정보를 배열에 추가하는 코드
def merge_foodcal(monthfoodinfo, foodcal):
    merged_result = []
    for info in monthfoodinfo:
        merged_entry = info[:]  # Create a copy of the entry
        for cal_info in foodcal:
            if info[1] == cal_info[0]:  # Compare the food names
                merged_entry.append(cal_info[1])  # Append the calorie information
                break  # Stop searching after finding a match
        merged_result.append(merged_entry)
    return merged_result

#데이터의 처리의 편의를 위해 2차원배열->날짜별로 정렬된 3차원배열의 형태로 변환하는 함수
def sort_to_day(array):
    result = []
    group = None
    for item in array:
        if group is None or item[0] != group[0][0]:
            group = [[item[0]]]
            result.append(group)
        group.append(item[1:])
    return result

#캘린더에서 정보 가져오기 실행
def run_calender_get(input):
    month = input[0]
    userid = input[1]
    month_data = get_monthfoodinfo(month, userid)
    month_food_info = get_foodcal(month_data)
    first_arr = merge_foodcal(month_data, month_food_info)
    final_arr = sort_to_day(first_arr)
    #print(final_arr)
    return final_arr

#캘린더에 데이터 삽입 실행
def run_calender_insert(date, userid, taken_food, time):
    insert_eat_food(date, userid, taken_food, time)
    
run_calender_get("""api로 데이터 입력받아 오기""")
mycursor.close()
mydb.close()