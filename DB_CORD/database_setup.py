# import mysql.connector

# mydb = mysql.connector.connect(
#    host="localhost",
#    user="test",
#    password="test"
# )

# mycursor = mydb.cursor()
# mycursor.execute("USE testdb")

# mycursor.execute('CREATE TABLE customers (test1 INT AUTO_INCREMENT PRIMARY KEY, test2 VARCHAR(255))')

# sql = "INSERT INTO customers (test2) VALUES (%s)"
# val = ("John",)
# mycursor.execute(sql, val)

# mydb.commit()

# print("1 record inserted, ID:", mycursor.lastrowid)

# mycursor.close()
# mydb.close()


# ------------------------------------------------------------------------
# pip install pymysql
import csv
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="",
    password=""  # 비밀번호
)

mycursor = mydb.cursor()
mycursor.execute("create database testdb;")  # 데이터베이스 만들기
mycursor.execute("USE testdb")

# 음식 테이블
# ------------------------------------------------------
mycursor.execute("create table food(\
food_small_scale_classification VARCHAR(12) NOT NULL,\
food_no INT,\
food_large_scale_classification VARCHAR(9),\
food_medium_scale_classification VARCHAR(9),\
serving_size_g INT,\
calorie_g FLOAT,\
protein_g FLOAT,\
fat_g FLOAT,\
carbohydrate_g FLOAT,\
salt_mg FLOAT,\
PRIMARY KEY(food_small_scale_classification)\
);")
# ------------------------------------------------------


# 고객 테이블
# ------------------------------------------------------
mycursor.execute("CREATE TABLE customer(\
id VARCHAR(10) NOT NULL,\
password VARCHAR(15),\
name VARCHAR(20),\
phone_number VARCHAR(20),\
coupon VARCHAR(20),\
login_count INT,\
CONSTRAINT customer_PK PRIMARY KEY(id)\
);")
# ------------------------------------------------------


# 비선호음식 테이블
# ------------------------------------------------------
mycursor.execute("CREATE TABLE dislike_food(\
customer_id VARCHAR(12),\
food_small_scale_classification VARCHAR(12),\
CONSTRAINT dislike_food_PK PRIMARY KEY(customer_id, food_small_scale_classification),\
CONSTRAINT dislike_food_FK FOREIGN KEY (customer_id) references customer(id),\
CONSTRAINT dislike_food_FK2 FOREIGN KEY (food_small_scale_classification) references food(food_small_scale_classification)\
);")
# ------------------------------------------------------


# 커뮤니티
# ------------------------------------------------------
mycursor.execute("CREATE TABLE community(\
serial_number INT AUTO_INCREMENT,\
customer_id VARCHAR(12),\
title TEXT,\
main_text TEXT,\
CONSTRAINT community_PK PRIMARY KEY(serial_number),\
CONSTRAINT community_FK FOREIGN KEY (customer_id) references customer(id)\
);")
# ------------------------------------------------------

# 캘린더
# ------------------------------------------------------
mycursor.execute("CREATE TABLE calender(\
user_id VARCHAR(12),\
day DATE,\
taken_food TEXT,\
time INT,\
CONSTRAINT calender_PK PRIMARY KEY(user_id),\
CONSTRAINT calender_FK FOREIGN KEY (user_id) references customer(id)\
);")
# ------------------------------------------------------


# food.csv파일 mysql에 삽입
# ------------------------------------------------------

with open('food.csv', "r", encoding='UTF8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        sql = "INSERT INTO food (food_no, food_large_scale_classification, food_medium_scale_classification, food_small_scale_classification, serving_size_g,\
            calorie_g, protein_g, fat_g, carbohydrate_g, salt_mg) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (row['food_no'], row['food_large_scale_classification'], row['food_medium_scale_classification'], row['food_small_scale_classification'], row['serving_size_g'],
               row['calorie_g'], row['protein_g'], row['fat_g'], row['carbohydrate_g'], row['salt_mg'])
        mycursor.execute(sql, val)
# ------------------------------------------------------

mydb.commit()
mycursor.close()
mydb.close()
