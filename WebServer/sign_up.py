from flask import Flask, render_template, url_for, session, request, redirect
import sys
import pymysql


conn = pymysql.connect(host='localhost',
                       user='root',
                       password='',  # 비밀번호
                       db='food_recommendation',
                       charset='utf8')


# 회원가입
def sign_up():
    id = request.args.get("id")
    password = request.args.get("password")
    name = request.args.get("name")
    birth = request.args.get("birth")
    sex = request.args.get("sex")
    phone_number = request.args.get("phone_number")
    email = request.args.get("eamil")

    sql = "INSERT INTO customer (id, password, name, birth, sex, phone_number, email) VALUES (%s, %s, %s, %s, %s, %s, %s)"

    with conn:
        with conn.cursor() as cur:
            cur.execute(sql, (id, password, name, birth, sex,
                        phone_number, email))
            conn.commit()

    return redirect(url_for("login"))