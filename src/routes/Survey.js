import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function Survey() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <h5 className="surveyTitle">
        <span className="surveyTitleLogo">이거먹자</span>에서 쿠폰받기
      </h5>
      <h6 className="surveySubTitle">
        '이거먹자'에 <span style={{color:"#f37500"}}>10번 방문</span>하고 <span style={{color:"#f37500"}}>10% 쿠폰</span> 받아가세요!
      </h6>
      <div className="tenper">10%~</div>
      <div className="surveyCalendar">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showPopperArrow={false}
          inline // Set inline prop to true
          minDate={new Date()}
          maxDate={
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          }
        />
      </div>
      <div
        className="greybox"
        style={{
          width: "350px",
          height: "200px",
          backgroundColor: "lightgrey",
          marginLeft: "15px",
          marginRight: "15px",
          marginTop: "20px",
          borderRadius: "20px",
          opacity: "0.5",
        }}
      >
        <div>
          <p
            className="boxText"
            style={{ textAlign: "left", marginLeft: "5px" , marginTop:"30px"}}
          >
            <br />
            - 본 쿠폰은 1일 1회만 발급 가능합니다.<br />
            - 식단 밸런스에 맞춰 추천된 메뉴의 식당이 선택되어, 그 식당을
            방문하시게 되면 그 다음 방문때 10% 할인을 받으실 수 있는 방식입니다.<br />
            - 쿠폰 양도 불가능<br />
            - 쿠폰 발급 받으신 것을 식당에 보여드리면 사용 가능합니다.</p>
        </div>
      </div>
      <button
        className="coupon_btn"
        style={{
          marginTop: "20px",
          width: "200px",
          height: "50px",
          border: "none",
          borderRadius: "15px",
          backgroundColor: "#f37500",
          color: "white",
        }}
      >
        <span className="coupon_txt">쿠폰 받으러 가기</span>
      </button>
    </div>
  );
}

export default Survey;
