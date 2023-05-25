from flask import Flask, render_template, url_for, session, request, redirect, jsonify
import sys
import mysql.connector
import recommendation
import calender_management
import login
import logout
import sign_up
import community_writing
import community_list
import json

app = Flask(__name__, template_folder='../static',
            static_folder='../static', static_url_path='/')
app.secret_key = "lfko2dfk5-!fgkfiapvn4"


mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",  # 비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE testdb")


#  홈화면
@app.route('/')
def home():
    if 'id' in session:
        return render_template('index.html', login=1)
    else:
        return render_template("index.html", login=0)


# 로그인
@app.route('/login', methods=["post"])
def login_check():
    Login = request.json
    returnvalue = login.login()
    if returnvalue == True:
        session['id'] = Login['id']
        return jsonify({'success': True})  # 성공
    else:
        return jsonify({'success': False})  # 실패

# 로그아웃


@app.route('/logout')
def Logout():
    logout.logout()
    return render_template('index.html')

# 회원가입


@app.route('/signup', methods=['POST'])
def Sign_up():
    sign_up.sign_up()
    return render_template("index.html")


# 마이페이지
# @app.route('/{userid}/mypage', methods=["POST"])
# def mypage(userid):
#    mypage(userid)


# 커뮤니티_글작성
@app.route('/community/{userid}/new-writing', methods=['POST'])
def Community_writing():
    userid = session.get("id")
    if userid != None:
        community_writing.community_writing()
        return
    else:
        return


# 커뮤니티_글목록
@app.route('/community/lists', methods=['GET'])
def Community_list():
    community_list_json = community_list.community_list()  # json 보내는 코드

    return jsonify(community_list_json)


# 음식추천
@app.route('/recommendation/<userid>', methods=['GET'])
def get_recommendation(userid):
    response = []
    response = recommendation.run_recommendation(userid)

    return jsonify(response)


# 캘린더
"""
@app.route('/calender/<userid>/date/foodname/time', methods=['POST'])
def get_food_by_userid_date_time(userid):
    date = request.args.get('date')
    foodname = request.args.get('foodname')
    time = request.args.get('time')
    
    try:
    # 실행 로직
        calender_management.run_calender_insert(date, userid, foodname)
        return "1"  # 성공 시 1을 반환
    except:
        return "0"  # 실패 시 0을 반환

"""


@app.route('/calender/<userid>/<date>', methods=['GET'])
def get_calender_by_userid_date(userid, date):

    response = []
    response = calender_management.run_calender_get(date, userid)

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5000)
