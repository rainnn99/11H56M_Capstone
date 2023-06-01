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
import coupon_count
import receive_coupon

app = Flask(__name__, template_folder='../front/public',
            static_folder='../front/public', static_url_path='/')
app.secret_key = "lfko2dfk5-!fgkfiapvn4"

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",  # 비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE capstone_11h56m")

#  홈화면
@app.route('/')
def home():
    if 'id' in session:
        return render_template('index.html', login=1)
    else:
        return render_template("index.html", login=0)

#로그인된 ID 확인하기
@app.route('/user')
def return_id():
    userid = session.get("id")
    if userid is None:
        return jsonify({"id" : None})
    else:
        return jsonify({"id" : userid})
    

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
@app.route('/logout', methods=["get"])
def Logout():
    logout.logout()
    return render_template('index.html')

# 회원가입
@app.route('/signup', methods=['POST'])
def Sign_up():
    sign_up.sign_up()
    return render_template("index.html")

# 커뮤니티_글작성
@app.route('/community/{userid}/new-writing', methods=['POST'])
def Community_writing():
    userid = session.get("id")
    if userid != None:
        community_writing.community_writing()
        
        return "True"
    else:
        return "False"


# 커뮤니티_글목록
@app.route("/community/lists", methods=['GET'])
def Community_list():
    community_list_json = community_list.community_list()  # json 보내는 코드
    
    return jsonify(community_list_json)

# 음식추천
@app.route('/recommendation', methods=['GET'])
def get_recommendation():
    userid = session.get("id")
    response = recommendation.run_recommendation(userid)

    return response


# 캘린더
@app.route('/calender', methods=['POST'])
def get_food_by_userid_date_time():
    userid = session.get("id")
    try:
    # 실행 로직
        calender_management.run_calender_insert(userid)
        return jsonify({'success': True})
    except:
        return jsonify({'success': False})

@app.route('/calender/<date>', methods=['GET'])
def get_calender_by_userid_date(date):
    userid = session.get("id")
    response = calender_management.run_calender_get(userid, date)
    return response

# 쿠폰 개수 조회
@app.route('/coupon/count', methods=['GET'])
def get_coupon_count():
    userid = session.get("id")
    coupon_num = coupon_count.countCoupon(userid)

    return coupon_num

# 쿠폰 받기
@app.route('/coupon/receive', methods=['GET'])
def receive_Coupon():
    userid = session.get("id")
    coupon_num = receive_coupon.receiveCoupon(userid)
    return coupon_num

if __name__ == '__main__':
    app.run(port=5000)
