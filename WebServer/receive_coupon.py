from flask import session
import mysql.connector
import coupon_count

mydb = mysql.connector.connect(
    host="localhost",
    user="test",
    password="test",
)
mycursor = mydb.cursor()
mycursor.execute("USE capstone_11h56m")

#쿠폰 지급
def receiveCoupon(userid):

    coupon_result = int(coupon_count.countCoupon(userid))
    

    coupon_result = coupon_result + 1
    
    sql = "UPDATE customer SET coupon = %s WHERE id = %s"
    val = (coupon_result, userid)

    mycursor.execute(sql, val)

    mydb.commit()


    return str(coupon_result)
