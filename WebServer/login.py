from flask import Flask, render_template, url_for, session, request, redirect
import sys
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",  # 비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE testdb")

# 로그인
# 아이디 비밀번호 확인

def login():
    login = request.json

    sql = "SELECT * FROM customer WHERE id = " + \
        login['id'] + " AND password = " + login['password']

    mycursor.execute(sql)

    user = mycursor.fetchone()

    if user != None:
        return True  # 로그인 성공
    else:
        return False  # 로그인 실패