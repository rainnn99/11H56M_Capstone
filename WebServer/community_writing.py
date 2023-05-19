from flask import Flask, render_template, url_for, session, request, redirect
import sys
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="capstone",
    password="",
)
mycursor = mydb.cursor()
mycursor.execute("USE test")


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