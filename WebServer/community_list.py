from flask import Flask, render_template, url_for, session, request, redirect
import sys
import pymysql

conn = pymysql.connect(host='localhost',
                       user='root',
                       password='',  # 비밀번호
                       db='food_recommendation',
                       charset='utf8')


# 커뮤니티_글목록
def community_list():

    sql = "select * from community"

    with conn:
        with conn.cursor() as cur:
            cur.execute(sql)

    row = cur.fetchall()

    return render_template('community.html', row=row)