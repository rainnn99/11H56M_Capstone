from flask import Flask, render_template, url_for, session, request, redirect
import sys
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
)
mycursor = mydb.cursor()
mycursor.execute("USE capstone_11h56m")


# 커뮤니티_글작성
def community_writing():
    userid = session.get("id")
    community = request.json

    sql = "INSERT INTO community (customer_id, title, main_text) VALUES (%s, %s, %s)"
    val = (userid, community["title"], community["content"])

    mycursor.execute(sql, val)
    mydb.commit()

    return
