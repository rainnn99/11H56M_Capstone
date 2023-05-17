from flask import Flask, render_template, url_for, session, request, redirect
import sys
import pymysql

conn = pymysql.connect(host='localhost',
                       user='root',
                       password='',  # 비밀번호
                       db='food_recommendation',
                       charset='utf8')

# 로그인
# 아이디 비밀번호 확인

def login():
    id = request.args.get("id")
    password = request.args.get("password")

    with conn:
        with conn.cursor() as cursor:
            cursor.execute(
                'SELECT * FROM customer WHERE username = %s AND password = %s', (id, password))
            user = cursor.fetchone()

    if user:
        session['id'] = user[1]
        return redirect(url_for("home"))
    else:
        return redirect(url_for("home"))