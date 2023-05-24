import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { GiForkKnifeSpoon } from "react-icons/gi";
import { VscFoldDown } from "react-icons/vsc";
import { HiDownload } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineFoodBank } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import Survey from './Survey';


function Main1() {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); //설문조사 창이 열려있는지 여부 관리하는 state, 초기값은 닫혀있음
    const toggleSurveyForm = () => setIsOpen(!isOpen); //isOpen값을 반전시켜 설문조사창을 열고 닫는 함수
    const pWrapRef = useRef(null); // useRef 훅으로 pWrap 요소에 대한 참조 생성
    const [isVisible, setIsVisible] = useState(false); // 애니메이션을 실행할 지 여부를 결정하는 state

    const handleScroll = () => {
      if (pWrapRef.current) { //pWrap부분이 브라우저 창에 나타날때마다 isVisible state값을 true로 설정하여 애니메이션 효과 나타나게 함
        const rect = pWrapRef.current.getBoundingClientRect(); //pWrap요소의 크기와 위치정보 반환해서 알려줌
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);//브라우저창의 높이랑 pWrap높이중 더 큰 값 반환
        setIsVisible(rect.top <= viewHeight && rect.bottom >= 0); //pWrap부분이 브라우저 창에 나타날때마다 isVisible state값을 true로 설정하여 애니메이션 효과 나타나게 함
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
    return (
        <div className='main1Total'>
          <div className='main1'>
            <div className='mainNav'>
              <div className='mainNavWrap'>
                <div className='mainLogo' onClick={() => {
                  navigate("/");
                  }}>이거먹자<GiForkKnifeSpoon /></div>
                  {/* <button className='appDownBtn'>App 다운로드< HiDownload/></button> */}
                  <button className='appDownBtn'onClick={() => {
                    navigate("/login");
                  }}>로그인/회원가입</button>
                  <div className='emoWrap'>
                    <div className='facebook'><FaFacebookF size={30}/></div>
                    <div className='insta'><BsInstagram size={30}/></div>
                    <div className='kakao'><RiKakaoTalkFill size={30}/></div>
                    <div className='youtube'><BsYoutube size={30}/></div>
                  </div>
                </div>
              </div>

              <div className='mainContentWrap'>
                <div ref={pWrapRef} className='pWrap'>
                  <p className="s1Title">아!<br />
                    오늘 뭐 먹지?   <br />
                    이거 먹자<GiForkKnifeSpoon />
                  </p>
                  <div className="smallTitle">
                    매일 뭐 먹을지 고민하는 당신, <br />당신의 중요한 시간을 아껴주는 한 마디!
                  </div>
                  <button className='btn1' onClick={() => {
                    navigate("/category");
                  }}>메뉴 추천 받으러 가기→</button>
                </div>

                <div className='m1icon'>
                  <img src='./main1_img.png' width={480} height={450}></img>
                </div>
              </div>
              
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
        </div>
    );
};

export default Main1;