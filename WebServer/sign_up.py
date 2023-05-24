from flask import Flask, render_template, url_for, session, request, redirect, jsonify
import sys
import mysql.connector
import json

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",  # 비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE testdb")


# 회원가입
def sign_up():
    data = request.json  # JSON 데이터를 받아옴
    # 수행할 작업을 여기에 작성하고, 필요에 따라 data를 활용
    customer = data

    try:
        sql = "INSERT INTO customer (id, password, name, phone_number) VALUES (%s, %s, %s, %s)"
        val = (customer['id'], customer['password'],
               customer['name'], customer['phone_number'])

        mycursor.execute(sql, val)
        mydb.commit()
        return
    except mysql.connector.errors.IntegrityError:
        print('에러')
        return