import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from "axios";

function Login() {
  // const userId = "capstone";
  // const userPw = "1234";
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    if (inputId === "" || inputPw === "") {
      //아이디랑 비밀번호 미입력시
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    axios
      .post("/login", { id: inputId, password: inputPw })
      .then((response) => {
        //api 연결 성공시
        const data = response.data;
        if (data.success) {
          navigate("/"); //홈화면으로
        } else {
          // 로그인 실패
          alert("아이디와 비밀번호를 확인해주세요.");
        }
      })
      .catch((error) => { //연결 실패
        console.error("Error:", error);
        alert("로그인 요청에 실패했습니다. 나중에 다시 시도해주세요.");
      });
  };

  return (
    <div>
      <div
        className="loginLogo"
        onClick={() => {
          navigate("/");
        }}
      >
        이거먹자
      </div>
      <div className="login">
        <h1
          className="loginText"
          style={{ marginTop: "80px", marginBottom: "40px", fontSize: "40px" }}
        >
          로그인
        </h1>
        <div className="inputSpace">
          <input
            style={{ textAlign: "left", width: "400px", height: "50px" }}
            id="inputId"
            label="Username"
            type="username"
            name="input_id"
            value={inputId}
            placeholder="아이디를 입력해주세요"
            onChange={handleInputId}
          />
          <input
            style={{
              marginTop: "15px",
              textAlign: "left",
              width: "400px",
              height: "50px",
            }}
            id="inputPw"
            label="Password"
            type="password"
            name="input_pw"
            value={inputPw}
            placeholder="비밀번호를 입력해주세요"
            onChange={handleInputPw}
          />
        </div>

        <div className="foundId" style={{ marginTop: "15px" }}>
          <span style={{ fontSize: "13px" }}>아이디 찾기 | 비밀번호 찾기</span>
        </div>

        <div className="logFunc">
          <Button
            size="large"
            style={{
              backgroundColor: "#f37500",
              marginTop: "20px",
              width: "400px",
              height: "50px",
              border: "none",
            }}
            onClick={onClickLogin}
          >
            로그인
          </Button>
          <Button
            size="large"
            style={{
              backgroundColor: "white",
              color: "#f37500",
              marginTop: "15px",
              width: "400px",
              height: "50px",
              borderColor: "#f37500",
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </Button>

          {/* <NaverLogin
                  clientId="5nS3chZV5apBhcX3f9xP"
                  callbackUrl="http://localhost:3000"
                  render={(props) => (
                     <Button
                        size="large" style={{backgroundColor : "rgb(25, 184, 5)", color:"white", marginTop : "50px", width: "400px", height : "60px", border:"none", textAlign:"left", display:"flex", flexDirection:"row"}} onClick={props.onClick}>
                        <SiNaver size={20} className="naverLoginLogo" style={{marginLeft:"20px", marginTop:"13px"}} /> 
                        <p className='naver_login_btn' >네이버 아이디로 로그인</p></Button>
                  )}
                  onSuccess={naverLoginHandler}
                  onFailure={(result) => console.error(result)}
                  /> */}

          {/*
                  <Button 
                  size="large" style={{backgroundColor : "rgb(245, 223, 29)", color: "rgb(49, 39, 6)", marginTop : "16px", width: "400px", height : "60px", border:"none", textAlign:"left", display:"flex", flexDirection:"row"}}
                  onClick={onClickLogin}> <RiKakaoTalkFill size={25} className="kakaoLoginLogo" style={{marginLeft:"20px", marginTop:"13px"}}/> 
                  <p className='kakao_login_btn'>카카오 계정으로 로그인</p></Button> */}
        </div>
        {/* <hr></hr>
               <span style={{fontSize : "13px"}}>아이디 찾기 | 비밀번호 찾기</span> */}
      </div>
    </div>
  );
}

export default Login;