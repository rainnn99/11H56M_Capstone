import { Margin } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNav from "./../MyNav";
import axios from "axios";
import { autocompleteClasses } from "@mui/material";

function SignUp() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/signup", formData)
      .then((response) => {
        //서버 응답내용을 response매개변수에 담아 콘솔에 출력
        console.log(response.data);
        navigate("/login"); //성공하면 로그인페이지로
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 체크 state
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const handleAllCheck = () => {
    //전체동의해주는 함수
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

  return (
    <div>
      <MyNav />
      <div>
        <h1 id="signup_title" style={{ marginBottom: "20px" }}>
          {" "}
          회원가입
        </h1>
        {/* <hr className="line" style={{ borderWidth: "3px" , marginTop:"20px"}}></hr> */}
      </div>
      <div className="signup">
        <form onSubmit={handleSubmit} className="formSignup">
          <div className="signWrap">
            <p className="pTag">
              {" "}
              이름<span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="inputTag"
              type="text"
              maxLength="20"
              name="name"
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div className="signWrap">
            <p className="pTag">
              {" "}
              아이디<span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="inputTag"
              type="text"
              maxLength="10"
              name="id"
              placeholder="아이디를 입력해주세요"
              onChange={handleChange}
            />
          </div>
          <div className="signWrap">
            <p className="pTag">
              비밀번호<span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="inputTag"
              type="password"
              maxLength="15"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
          </div>

          {/* <div className="signWrap">
            <p className="pTag">
              비밀번호 확인<span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="inputTag"
              type="password"
              maxLength="15"
              name="signup_pwch"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </div> */}

          {/* 
            <div className="signWrap">
            <p className="pTag">이메일</p>
              <input type='text' maxLength='15' name='email' placeholder="doctorfood" onChange={handleChange}/> @
              <select name='signup_emailselect'>
                <option value='gmail.com'> gmail.com </option>
                <option value='naver.com'> naver.com </option>
                <option value='write'> 직접 입력 </option>
              </select>
            </div> */}

          <div className="signWrap">
            <p className="pTag">
              휴대폰<span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="inputTag"
              type="text"
              maxLength="20"
              name="phone_number"
              placeholder="숫자만 입력해주세요"
              onChange={handleChange}
            />
          </div>

          {/* <div className="signWrap">
            <p className="pTag" style={{marginBottom:"5px"}}>성별</p>
                <div className="signRadio" style={{display:"flex", flexDirection:"row", width:"300px", margin:"0 auto",justifyContent:"center"}}>
                    <input type='checkbox' maxLength='1' name='signup_gen'></input>
                    <h5 className="signH5">남자</h5>
                    <input type='checkbox' maxLength='1' name='signup_gen'></input>
                    <h5 className="signH5">여자</h5>
                    <input type='checkbox' maxLength='1' name='signup_gen'></input>
                    <h5>선택안함</h5>
                </div>
            </div> */}

          {/* <div className="signWrap">
            <p className="pTag" style={{marginBottom:"5px"}}>생년월일<span style={{color:"red"}}>*</span></p>
              <input type='text' maxLength='6' name='signup_birth'placeholder="YYMMDD" style={{width:"100px"}}/> - 
              <input type='text' maxLength='1' name='signup_birth2'/> ******
            </div> */}

          {/* <hr className="line" style={{ borderWidth: "3px"}}></hr> */}
          <div
            className="agreeWrap"
            style={{
              width: "450px",
              height: "200px",
              backgroundColor: "lightgrey",
              margin: "0 auto",
              borderRadius: "20px",
              opacity: "0.5",
              textAlign: "center",
            }}
          >
            <p className="agreeUse">이용약관동의</p>
            <div className="agreeBoxWrap">
              <div className="agreeBox">
                <input
                  type="checkbox"
                  maxLength="1"
                  name="signup_agree"
                  checked={isCheckedAll}
                  onChange={handleAllCheck}
                />
                <h6 style={{ fontWeight: "bold", marginLeft: "15px" }}>
                  전체 동의합니다.
                </h6>
              </div>

              <div className="agreeBox">
                <input
                  type="checkbox"
                  maxLength="1"
                  name="signup_agree"
                  checked={isChecked1}
                  onChange={() => handleCheck("agree1")}
                />
                <h6 style={{ marginLeft: "15px" }}>이용약관 동의 (필수)</h6>
              </div>

              <div className="agreeBox">
                <input
                  type="checkbox"
                  maxLength="1"
                  name="signup_agree"
                  checked={isChecked2}
                  onChange={() => handleCheck("agree2")}
                />
                <h6 style={{ marginLeft: "15px" }}>
                  개인정보 수집/이용 동의(필수)
                </h6>
              </div>

              <div className="agreeBox">
                <input
                  type="checkbox"
                  maxLength="1"
                  name="signup_agree"
                  checked={isChecked3}
                  onChange={() => handleCheck("agree3")}
                />
                <h6 style={{ marginLeft: "15px" }}>
                  개인정보 수집/이용 동의(선택)
                </h6>
              </div>

              <div>
                <button
                  type="submit"
                  value="가입하기"
                  className="signupButton"
                  // onClick={handleSubmit}
                >
                  가입하기
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;