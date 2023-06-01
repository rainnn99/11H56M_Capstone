from flask import Flask, render_template, url_for, session, request, redirect
import sys
import mysql.connector
import json

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",  # 비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE capstone_11h56m")


# 커뮤니티_글목록
def community_list():

    mydb.commit()

    sql = "SELECT * FROM community"

    mycursor.execute(sql)
    row = mycursor.fetchall()

    result = []
    if len(row) > 0:
        for i in range(len(row)):
            data = {
                'id': row[i][0],
                'userId': row[i][1],
                'title': row[i][2]
            }
            result.append(data)
        #community_list_json = json.dumps(result)

    else:
        print("No data found.")

    return result