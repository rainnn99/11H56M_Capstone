# pip install Flask

from flask import Flask, render_template, url_for, session, request, redirect
import sys
import pymysql

app = Flask(__name__)
app.secret_key = "lfko2dfk5-!fgkfiapvn4"


conn = pymysql.connect(host='localhost',
                       user='root',
                       password='',  # 비밀번호
                       db='food_recommendation',
                       charset='utf8')


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


# 로그아웃
@app.route('/logout')


# 회원가입
@app.route('/signup', methods=['POST'])



# 커뮤니티_글작성
@app.route('/community_writing', methods=['POST'])



# 커뮤니티_글목록
@app.route('/community_list', methods=['POST'])



# 음식추천
#@app.route('/food_recommendation', methods=['POST'])


#캘린더
#@app.route('/calander_managment')