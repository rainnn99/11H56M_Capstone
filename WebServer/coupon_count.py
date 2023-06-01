from flask import session
import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
)
mycursor = mydb.cursor()
mycursor.execute("USE capstone_11h56m")

# 쿠폰 카운트
def countCoupon(userid):
    mydb.commit()

    get_count = "SELECT coupon FROM customer WHERE id = %s"
    get_count_val = (userid,)

    mycursor.execute(get_count, get_count_val)
    coupon_num = mycursor.fetchone()

    
    return str(coupon_num[0])
