# pip install Flask

from flask import Flask, render_template, url_for, session, request, redirect, jsonify
import sys
import mysql.connector
import recommendation, calender_management, login, logout, sign_up, community_writing, community_list, mypage, json

app = Flask(__name__)
app.secret_key = "lfko2dfk5-!fgkfiapvn4"


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",        #비밀번호
)
mycursor = mydb.cursor()
mycursor.execute("USE food_recommendation")


def main():
    app.run(host='0.0.0.0', port=5000)


if __name__ == "__main__":
    main()


#  홈화면
@app.route('/')
def home():
    if 'id' in session:
        return render_template('home.html', login=True)
    else:
        return render_template("home.html", login=False)


# 로그인
# @app.route('/login')
# def login():
#    return render_template('login.html')
@app.route('/login', methods=["post"])
def login():
    login()

# 로그아웃
@app.route('/logout')
def logout():
    logout()

# 회원가입
@app.route('/sign_up', methods=['POST'])
def sign_up():
    sign_up()

#마이페이지
@app.route('/{userid}/mypage', methods=["POST"])
def mypage(userid):
    mypage(userid)


# 커뮤니티_글작성
@app.route('/community_writing', methods=['POST'])
def community_writing():
    community_writing()


# 커뮤니티_글목록
@app.route('/community_lists', methods=['GET'])
def community_list():
    community_list_json = community_list.community_list()  # json 보내는 코드

    # 역슬래시 제거
    community_list_json = community_list_json.replace('\\', '')

    # JSON 데이터 파싱
    parsed_community_list_json = json.loads(community_list_json)

    # JSON 문자열 생성 (구분자 지정)
    parsed_community_list_json = json.dumps(
        parsed_community_list_json, separators=(',', ':'))

    return jsonify(community_list_json)


# 음식추천
@app.route('/user_recommendation', methods=['POST'])
def user_recommendation():
    user_recommendation()

#캘린더
@app.route('/calender_management')
def calender_management():
    calender_management()