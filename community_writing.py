from flask import Flask, render_template, url_for, session, request, redirect
import sys
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
)
mycursor = mydb.cursor()

# 이 부분
mycursor.execute("USE food_recommendation")


# 커뮤니티_글작성
def community_writing():
    userid = session.get("id")
    title = request.form['title']
    main_text = request.form['main_text']

    sql = "INSERT INTO community (customer_id, title, main_text) VALUES (%s, %s, %s)"
    val = (userid, title, main_text)

    mycursor.execute(sql, val)
    mydb.commit()

    return