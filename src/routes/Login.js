import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
   const userId = "capstone";
   const userPw = "1234";
   const [inputId, setInputId] = useState('');
   const [inputPw, setInputPw] = useState('');
   const navigate = useNavigate();

   const handleInputId = (e) => {
      setInputId(e.target.value)
   }

   const handleInputPw = (e) => {
      setInputPw(e.target.value)
   }

 // login 버튼 클릭 이벤트
  const onClickLogin = () => {
      if (userId == inputId && userPw == inputPw) {
          navigate('/');
      } 
      else if (inputId == "" && inputPw == "") {
         alert("아이디와 비밀번호를 입력하세요.");
      } else {
         alert("아이디와 비밀번호를 확인해주세요.");
      }
  }
   return (
      <div>
      <div className='loginLogo' onClick={() => {
                  navigate("/");
               }}>이거먹자</div>
      <div className='login'>
         <h1 className="loginText" style={{marginTop:"80px", marginBottom : "40px", fontSize : "40px"}}>로그인</h1>
            <div className='inputSpace'>
            <input style={{textAlign : "left", width: "400px", height : "50px"}}
               id="inputId"
               label="Username"
               type="username"
               name="input_id"
               value={inputId}
               placeholder="아이디를 입력해주세요"
               onChange={handleInputId}
            />
            <input style={{marginTop : "15px", textAlign : "left", width: "400px", height : "50px"}}
               id="inputPw"
               label="Password"
               type="password"
               name='input_pw'
               value={inputPw}
               placeholder="비밀번호를 입력해주세요"
               onChange={handleInputPw}
            />   
            </div>

            <div className='foundId' style={{marginTop:"15px"}}>
               <span style={{fontSize : "13px"}}>아이디 찾기 | 비밀번호 찾기</span>   
            </div>

            <div className='logFunc'>
               <Button
               size="large" style={{backgroundColor : "#f37500", marginTop : "20px", width: "400px", height : "50px", border:"none"}}
               onClick={onClickLogin}>로그인</Button>
               <Button
               size="large" style={{backgroundColor : "white", color:"#f37500", marginTop : "15px", width: "400px", height : "50px", borderColor:"#f37500"}}
               onClick={() => {
                  navigate("/signup");
              }}>회원가입</Button>   
            </div>
            {/* <hr></hr>
            <span style={{fontSize : "13px"}}>아이디 찾기 | 비밀번호 찾기</span> */}
      </div>
      </div>
   )
 }
 
 export default Login;