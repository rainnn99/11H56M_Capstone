import { Margin } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNav from "./../MyNav";

function SignUp () {

    let navigate = useNavigate();

    // 체크 state
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
  
    const handleAllCheck = () => { //전체동의해주는 함수
      setIsCheckedAll(!isCheckedAll);
      setIsChecked1(!isCheckedAll);
      setIsChecked2(!isCheckedAll);
      setIsChecked3(!isCheckedAll);
    };
  
    const handleCheck = (name) => {
      switch (name) {
        case "agree1":
          setIsChecked1(!isChecked1);
          break;
        case "agree2":
          setIsChecked2(!isChecked2);
          break;
        case "agree3":
          setIsChecked3(!isChecked3);
          break;
        default:
          break;
      }
    };
  
    return(
        <div>
          <MyNav />
        <div>
          <h1 id='signup_title'> 회원가입</h1>
          <hr className="line" style={{ borderWidth: "3px" , marginTop:"20px"}}></hr>
        </div>
        <div className='signup'>

        <div>
            <div className="signWrap">
              <p className="pTag"> 이름<span style={{color:"red"}}>*</span></p>
              <input className="inputTag" type='text' maxLength='20' name='signup_name'
              placeholder="이름을 입력해주세요"/>
            </div>

            <div className="signWrap">
            <p className="pTag"> 아이디<span style={{color:"red"}}>*</span></p>
              <input className="inputTag" type='text' maxLength='10' name='signup_id'placeholder="아이디를 입력해주세요"/>
            </div>

            <div className="signWrap">
            <p className="pTag">비밀번호<span style={{color:"red"}}>*</span></p>
              <input className="inputTag" type='password' maxLength='15' name='signup_pw' placeholder="비밀번호를 입력해주세요"/>
            </div>

            <div className="signWrap">
            <p className="pTag">비밀번호 확인<span style={{color:"red"}}>*</span></p>
              <input className="inputTag" type='password' maxLength='15' name='signup_pwch' placeholder="비밀번호를 한번 더 입력해주세요"/>
            </div>


            <div className="signWrap">
            <p className="pTag">이메일</p>
              <input type='text' maxLength='15' name='signup_email' placeholder="doctorfood"/> @
              <select name='signup_emailselect'>
                <option value='gmail.com'> gmail.com </option>
                <option value='naver.com'> naver.com </option>
                <option value='write'> 직접 입력 </option>
              </select>
            </div>

            <div className="signWrap">
            <p className="pTag">휴대폰<span style={{color:"red"}}>*</span></p>
                <input className="inputTag" type='text' maxLength='20' name='signup_num' placeholder="숫자만 입력해주세요"/>
            </div>

            <div className="signWrap">
            <p className="pTag" style={{marginBottom:"5px"}}>성별</p>
                <div className="signRadio" style={{display:"flex", flexDirection:"row", width:"300px", margin:"0 auto",justifyContent:"center"}}>
                    <input type='checkbox' maxLength='1' name='signup_gen'></input>
                    <h5 className="signH5">남자</h5>
                    <input type='checkbox' maxLength='1' name='signup_gen'></input>
                    <h5 className="signH5">여자</h5>
                    <input type='checkbox' maxLength='1' name='signup_gen'></input>
                    <h5>선택안함</h5>
                </div>
            </div>

            <div className="signWrap">
            <p className="pTag" style={{marginBottom:"5px"}}>생년월일<span style={{color:"red"}}>*</span></p>
              <input type='text' maxLength='6' name='signup_birth'placeholder="YYMMDD" style={{width:"100px"}}/> - 
              <input type='text' maxLength='1' name='signup_birth2'/> ******
            </div>

            

          </div>
          <hr className="line" style={{ borderWidth: "3px"}}></hr>
          <div className="agreeWrap">
            
            <p className="agreeUse">이용약관동의</p>
            <div>
                <input type='checkbox' maxLength='1' name='signup_agree' 
                checked={isCheckedAll} 
                onChange={handleAllCheck}/>
                <h6 style={{fontWeight:"bold"}}>전체 동의합니다.</h6>

                <input type='checkbox' maxLength='1' name='signup_agree' 
                checked={isChecked1} 
                onChange={() => handleCheck("agree1")}/>
                <h6>이용약관 동의 (필수)</h6>

                <input type='checkbox' maxLength='1' name='signup_agree'
                checked={isChecked2}
                onChange={() => handleCheck("agree2")}/>
                <h6>개인정보 수집/이용 동의(필수)</h6>

                <input type='checkbox' maxLength='1' name='signup_agree'
                checked={isChecked3}
                onChange={() => handleCheck("agree3")}/>
                <h6>개인정보 수집/이용 동의(선택)</h6>
            </div>
          
          </div>
        </div>

        <div>
          <input type='button' value='가입하기' name='sigunup_btn'
          onClick={() => {
            navigate("/");
        }}/>
        </div>
      </div>
    )
}

export default SignUp;