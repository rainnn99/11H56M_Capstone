from flask import Flask, render_template, url_for, session, request, redirect

# 로그아웃
def logout():
    session.pop("id")
    return render_template('home.html')