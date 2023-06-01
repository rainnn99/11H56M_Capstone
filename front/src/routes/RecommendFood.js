import React, { useState, useEffect } from "react";
import MyNav from "./../MyNav";
import { BsQuestionLg } from "react-icons/bs";
import { VscFoldDown } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { RiCoupon3Line } from "react-icons/ri";
import Survey from './Survey';
import axios from 'axios';
import { MdRecommend } from "react-icons/md";

function RecommendFood() {

  const images = [
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/20139e33-d871-4de9-a2e8-18a3024af36d.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/d634ff5a-3ebf-4546-99b2-3dbe43ff2c9f.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/1160c655-83e8-4a4d-841e-183ef8c64c6e.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/325799a2-2fea-4a20-a15c-533f8db79adc.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/9fc214fb-a40a-45b0-a242-ac9a7d382d8e.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/d634ff5a-3ebf-4546-99b2-3dbe43ff2c9f.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/29725143-41b6-4d1b-82ca-f93f0b426386.jpg",
    "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/d6534041-00b3-4b6d-a2e4-ffe6174e4e5c.jpg",
    // image url
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false); //설문조사 창이 열려있는지 여부 관리하는 state, 초기값은 닫혀있음
  const toggleSurveyForm = () => setIsOpen(!isOpen); //isOpen값을 반전시켜 설문조사창을 열고 닫는 함수
  const [isRecommendShown, setIsRecommendShown] = useState(false);
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  
  useEffect(() => {
    if (isRecommendShown) {
      axios
        .get(`/recommendation`)
        .then(response => {
          const recommendationData = response.data;
          setRecommendation(recommendationData);
        })
        .catch(error => {
          console.error('Error fetching recommendation:', error);
        });
    }
  }, [isRecommendShown]);
  
  const onClickBtn = () => {
    setIsRecommendShown(true);
  };

  return (
    <div>
      <div className="recommandTop">
        <div className="recommendTopText">10번 방문하고, <span style={{fontWeight:"bold"}}>10% 할인 쿠폰</span> 받아가세요!</div>
      </div>
      <MyNav />
      <div
        className="slideShowFood"
        style={{ width: "100%", height: "360px", overflow: "hidden" }}
      >
        <img
          src={images[currentImageIndex]}
          alt="Slideshow Image"
          style={{ width: "100%" }} 
        />
      </div>
      <div className="recommendLargeTxt"><span style={{fontWeight:"bold"}}>이거먹자</span>의 <span style={{fontWeight:"bold", color:"#f37500"}}>Ai 음식 추천</span>이란?</div>
      <div className="recommendSmallTxt">캘린더에 입력된 최근 먹은 50가지의 음식들중에서 나에게 부족한 영양소를 채워줄 수 있는 이거먹자만의 Ai 음식 추천 기능으로 균형적인 식단을 도와줍니다.</div>
      <div className="recommendMediumWrap" style={{display:"flex", flexDirection:"row"}}>
      <div className="recomtxt">캘린더 분석 결과, "<span style={{fontWeight:"bold", color:"#f37500"}}>{recommendation["부족영양"]}</span>"이 부족한 당신에게 추천드리는 음식</div>
        <button className="recommendBtn" onClick={onClickBtn}>추천 받기</button>
      </div>
      
      {/* <div className="recommendWrap">
        <div className="q1" ><BsQuestionLg size={140} style={{color:"black", marginTop:"42px", marginLeft:"5px"}} /></div>
        <div className="q2"><BsQuestionLg size={140} style={{color:"black", marginTop:"42px", marginLeft:"5px"}}/></div>
        <div className="q3"><BsQuestionLg size={140} style={{color:"black", marginTop:"42px", marginLeft:"5px"}}/></div>
        <div className="q4"><BsQuestionLg size={140} style={{color:"black", marginTop:"42px", marginLeft:"5px"}}/></div>
      </div> */}

{isRecommendShown ? (
  <div className="recommendWrap">
    <div className="q1">
        <div className="recommendMenu">
            <div className="menu">{recommendation["0"]}</div>
        </div>
    </div> 
    <div className="q2">
        <div className="recommendMenu">
            <div className="menu">{recommendation["1"]}</div>
        </div>
    </div>
    <div className="q3">
        <div className="recommendMenu">
            <div className="menu">{recommendation["2"]}</div>
        </div>
    </div>
    <div className="q4">
        <div className="recommendMenu">
            <div className="menu">{recommendation["3"]}</div>
        </div>
    </div>
  </div>
) : (
  <div className="recommendWrap">
    <div className="q1">
      {recommendation.length > 0 && (
        <div className="recommendMenu">
          <div>{recommendation[0].name}</div>
        </div>
      )}
    </div>
    <div className="q2">
      {recommendation.length > 1 && (
        <div className="recommendMenu">
          <div>{recommendation[1].name}</div>
        </div>
      )}
    </div>
    <div className="q3">
      {recommendation.length > 2 && (
        <div className="recommendMenu">
          <div>{recommendation[2].name}</div>
        </div>
      )}
    </div>
    <div className="q4">
      {recommendation.length > 3 && (
        <div className="recommendMenu">
          <div>{recommendation[3].name}</div>
        </div>
      )}
    </div>
  </div>
)}


      <div className="floatingIcon"><VscFoldDown size={40}/></div>
              {/* <div className="scrollText">스크롤</div> */}
          
             {!isOpen && ( //설문조사창이 열려있지 않으면 floating Icon 뜸
              <div className='floatingCoupon'
                style={{
                  display:'flex',
                  flexDirection:'column',
                  position: 'fixed',
                  bottom: '50px',
                  right: '40px',
                  width: '65px',
                  height: '65px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  color: '#f37500',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '5px 5px 5px grey'
                  
                }}
                onClick={toggleSurveyForm} //클릭하면 toggleSurveyForm 함수가 호출되어 isOpen값이 반전되어 ServeyForm으로
              > <RiCoupon3Line size={30} style={{width:"30px", height:"30px"}}/>
                <i className="fa fa-question-circle fa-lg" /><p className='coupon_text' style={{marginBottom:"0px"}}>쿠폰</p>
              </div>
             )}

            {/* 설문조사 창 */}
            {isOpen && (
              <div
                style={{
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                  width: '420px',
                  height: '900px',
                  backgroundColor: '#fff',
                  // boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  boxShadow: '10px 10px 15px gray',
                  borderRadius: '10px',
                  padding: '20px',
                  zIndex: '9999',
                }}
              >
                {/* 설문조사창 닫기 누르면 다시 toggleSurveyForm이 호출되어 isOpen값이 반전되어 설문조사창 닫기 */}
                <AiOutlineClose className="surveyClose" //설문조사 X 부분
                  onClick={toggleSurveyForm} style={{ width: '40px', height:'30px' }}
                  /> 
              
                {/* 설문조사창 안에 콘텐츠 부분 */}
                <form>
                  <Survey />
                </form>
              </div>
            )}
            
    </div>
  );
}
export default RecommendFood