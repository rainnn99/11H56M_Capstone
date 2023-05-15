import React from 'react';
import { useNavigate } from 'react-router-dom'
import { GiForkKnifeSpoon } from "react-icons/gi";
import { HiDownload } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
function MainNav() {

    let navigate = useNavigate();

    return (
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
    );
};

export default MainNav;