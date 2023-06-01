import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { VscFoldDown } from "react-icons/vsc";
import { HiDownload } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { RiCoupon3Line } from "react-icons/ri";
import Survey from "./Survey";
import axios from "axios";

function Main3() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); //설문조사 창이 열려있는지 여부 관리하는 state, 초기값은 닫혀있다.
  const toggleSurveyForm = () => setIsOpen(!isOpen); //isOpen값을 반전시켜 설문조사창을 열고 닫는 함수
  const pWrapRef = useRef(null); // useRef 훅으로 pWrap 요소에 대한 참조 생성
  const [isVisible, setIsVisible] = useState(false); // 애니메이션을 실행할 지 여부를 결정하는 state
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleScroll = () => {
    if (pWrapRef.current) {
      const rect = pWrapRef.current.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );
      setIsVisible(rect.top <= viewHeight && rect.bottom >= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      pWrapRef.current.style.animation = "slide 1.5s ease-out";
    } else {
      pWrapRef.current.style.animation = "none";
    }
  }, [isVisible]);

  useEffect(() => {
    // Fetch the logged-in user's name from the backend
    axios
      .get("/user")
      .then((response) => {
        const data = response.data;
        console.log(data)
        if (data.id !== null) {
          setLoggedInUser(data.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching logged-in user:", error);
      });
  }, []);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return (
    <div className="main1Total">
      <div className="main1">
        <div className="mainNav">
          <div className="mainNavWrap">
            <div
              className="mainLogo"
              onClick={() => {
                navigate("/");
              }}
            >
              이거먹자
              <GiForkKnifeSpoon />
            </div>
            <button className='appDownBtn'
              onClick={() => {
                if (loggedInUser) {
                  axios.get("/logout")
                    .then((response) => {
                      console.log("로그아웃 되었습니다.");
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.error("로그아웃 오류:", error);
                    });
                  
                } else {
                  navigate("/login");
                }
              }}
            >
              {loggedInUser ? `${loggedInUser} 님` : "로그인/회원가입"}
            </button>
            <div className="emoWrap">
              <div className="facebook">
                <FaFacebookF size={30} />
              </div>
              <div className="insta">
                <BsInstagram size={30} />
              </div>
              <div className="kakao">
                <RiKakaoTalkFill size={30} />
              </div>
              <div className="youtube">
                <BsYoutube size={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="mainContentWrap">
          <div ref={pWrapRef} className="pWrap">
            <p className="s1Title">
              <span className="text_black">"Ai로"</span>
              <br />내 <span className="text_yellow">건강</span>에 맞춰
              <br />
              <span className="text_black">음식 추천</span>까지!
            </p>
            <div className="smallTitle">
              캘린더에 입력한{" "}
              <span className="ai_bold">최근 50회의 식사들을 바탕으로</span> <br />
              <span className="ai_bold">부족한 영양소</span>를 선별하여{" "}
              <span className="ai_bold">채워줄 수 있는</span> <br />
              <span className="ai_bold">음식 추천</span> 기능을 이거 먹자에서!
            </div>
            <button
              className="btn1"
              onClick={() => {
                navigate("/recommendfood");
              }}
            >
              Ai한테 음식 추천 받기 →
            </button>
          </div>

          <div className="m3icon">
            <img src="./main33.png" width={480} height={450}></img>
          </div>

          <div className="floatingIcon">
            <VscFoldDown size={40} />
          </div>
          {/* <div className="scrollText">스크롤</div> */}

          {!isOpen && ( //설문조사창이 열려있지 않으면 floating Icon 뜸
            <div
              className="floatingCoupon"
              style={{
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                bottom: "50px",
                right: "40px",
                width: "65px",
                height: "65px",
                backgroundColor: "white",
                borderRadius: "50%",
                color: "#f37500",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "5px 5px 5px grey",
              }}
              onClick={toggleSurveyForm} //클릭하면 toggleSurveyForm 함수가 호출되어 isOpen값이 반전되어 ServeyForm으로
            >
              {" "}
              <RiCoupon3Line
                size={30}
                style={{ width: "30px", height: "30px" }}
              />
              <i className="fa fa-question-circle fa-lg" />
              <p className="coupon_text" style={{ marginBottom: "0px" }}>
                쿠폰
              </p>
            </div>
          )}

          {/* 설문조사 창 */}
          {isOpen && (
            <div
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "420px",
                height: "900px",
                backgroundColor: "#fff",
                // boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                boxShadow: "10px 10px 15px gray",
                borderRadius: "10px",
                padding: "20px",
                zIndex: "9999",
              }}
            >
              {/* 설문조사창 닫기 누르면 다시 toggleSurveyForm이 호출되어 isOpen값이 반전되어 설문조사창 닫기 */}
              <AiOutlineClose
                className="surveyClose" //설문조사 X 부분
                onClick={toggleSurveyForm}
                style={{ width: "40px", height: "30px" }}
              />

              {/* 설문조사창 안에 콘텐츠 부분 */}
              <form>
                <Survey />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main3;