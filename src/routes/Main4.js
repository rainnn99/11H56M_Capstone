import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { VscFoldDown } from "react-icons/vsc";
import { HiDownload } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Main4() {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); //설문조사 창이 열려있는지 여부 관리하는 state, 초기값은 닫혀있다.
    const toggleSurveyForm = () => setIsOpen(!isOpen); //isOpen값을 반전시켜 설문조사창을 열고 닫는 함수
    const pWrapRef = useRef(null); // useRef 훅으로 pWrap 요소에 대한 참조 생성
    const [isVisible, setIsVisible] = useState(false); // 애니메이션을 실행할 지 여부를 결정하는 state

    const handleScroll = () => {
      if (pWrapRef.current) {
        const rect = pWrapRef.current.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
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
    
    return (
        <div className='main1Total'>
            <div className='main1'>
                <div className='mainNav'>
                    <div className='mainNavWrap'>
                        <div className='mainLogo' onClick={() => {
                        navigate("/");
                        }}>이거먹자<GiForkKnifeSpoon /></div>
                        <button className='appDownBtn'>App 다운로드< HiDownload/></button>
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
                      <p className="s1Title">
                          이거먹자는<br />
                          커뮤니티로<br />
                          '맛집공유'까지?!
                      </p>
                      <div className="smallTitle">
                          매일 뭐 먹을지 고민하는 당신, <br />
                        사람들과 얘기하며 나눠요
                      </div>
                      <button className='btn1' onClick={() => {
                          navigate("/postlist");
                      }}>이거먹자 커뮤니티 →</button>
                  </div>

                  <div className='m4icon'>
                  <img src='./main4_img.png' width={480} height={450}></img>
                  </div>
                </div>
                    

                
            </div>    
        </div>
    );
};

export default Main4;