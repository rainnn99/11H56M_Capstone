from flask import Flask, render_template, url_for, session, request, redirect
import sys
import pymysql

conn = pymysql.connect(host='localhost',
                       user='root',
                       password='',  # 비밀번호
                       db='food_recommendation',
                       charset='utf8')


# 커뮤니티_글작성
def community_writing():
    id = request.args.get("id")
    title = request.args.get("title")
    main_text = request.args.get("main_text")

    sql = "INSERT INTO community (id, title, main_text) VALUES (%s, %s, %s)"

    with conn:
        with conn.cursor() as cur:
            cur.execute(sql, (id, title, main_text))
            conn.commit()

    return redirect(url_for("community_list"))