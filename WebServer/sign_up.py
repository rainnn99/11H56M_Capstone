from flask import Flask, render_template, url_for, session, request, redirect
import sys
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # 비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE food_recommendation")


# 회원가입
def sign_up():
    id = request.form['id']
    password = request.form['password']
    name = request.form['name']
    birth = request.form['birth']
    sex = request.form['sex']
    phone_number = request.form['phone_number']
    email = request.form['email']

    sql = "INSERT INTO customer (id, password, name, birth, sex, phone_number, email) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = (id, password, name, birth, sex, phone_number, email)
    mycursor.execute(sql, val)
    mydb.commit()

    return