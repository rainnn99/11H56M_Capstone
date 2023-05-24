import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Cart from "./routes/Cart";
import MyPage from "./routes/MyPage";
import Community from "./routes/Community";
import Category from "./routes/Category";
import MyNav from "./MyNav";
import MainNav from"./MainNav";
import Main1 from "./routes/Main1"
import Main2 from "./routes/Main2"
import Main3 from "./routes/Main3"
import Main4 from "./routes/Main4"
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { VscFoldDown } from "react-icons/vsc";
import PostForm from "./routes/PostForm";
import PostList from "./routes/PostList";
import PostModal from "./routes/PostModal";
import ChineseFood from "./routes/FoodCategory/ChineseFood";
import WesternFood from './routes/FoodCategory/WesternFood';
import JapaneseFood from './routes/FoodCategory/JapaneseFood';
import AsianFood from './routes/FoodCategory/AsianFood';
import Snack from './routes/FoodCategory/Snack';
import KoreanFood from './routes/FoodCategory/KoreanFood';
import MyCalendar from './routes/MyCalendar';
import MyModal from "./routes/MyModal";
import Game from "./routes/Game";
import Survey from "./routes/Survey";

function App() {
  let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false); //설문조사 창이 열려있는지 여부 관리하는 state, 초기값은 닫혀있다.
    const toggleSurveyForm = () => setIsOpen(!isOpen); //isOpen값을 반전시켜 설문조사창을 열고 닫는 함수
    const [windowHeight, setWindowHeight] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const sectionCount = 4;
    
    useEffect(() => {
      // 브라우저 창의 높이를 구해서 state에 저장
      const handleResize = () => setWindowHeight(window.innerHeight);
      handleResize(); // 컴포넌트가 처음 마운트될 때 한 번 실행
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const sectionStyle = {
      height: `${windowHeight}px`,
    };

    useEffect(() => {

      const handleWheel = (event) => {
        event.preventDefault();
        const deltaY = event.deltaY; // 마우스 휠 움직임 값
        // const distance = 1; // 한 페이지씩 스크롤되도록 거리를 섹션의 높이값으로 설정
        const direction = deltaY > 0 ? 1 : -1; // 스크롤 방향 계산
        const nextSection = Math.min(
           Math.max(currentSection + direction, 0),
           sectionCount - 1
         ); // 다음 섹션 번호 계산
        const scrollTop = windowHeight * nextSection ; // 다음 섹션의 스크롤 위치 계산
        window.scrollTo({ top: scrollTop, behavior: "smooth" }); // 스크롤 이동
        setCurrentSection(nextSection);
      };
      window.addEventListener("wheel", handleWheel);
      return () => window.removeEventListener("wheel", handleWheel);
    }, [currentSection, windowHeight]);
  
    const handleSectionClick = (index) => {
      const scrollTop = windowHeight * index; // 해당 섹션의 스크롤 위치 계산
      window.scrollTo({ top: scrollTop, behavior: "smooth" }); // 스크롤 이동
      setCurrentSection(index);
    };
  

  return (

      <div className="App">
    
        <div className="floatingIcon"><VscFoldDown/></div>
        <div className="appCenter">
          <Routes>
            <Route path="/" element={
              <>
              <div className="appScreen">
                <div className="dots">
                {Array.from({ length: sectionCount }, (_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === currentSection ? 'active' : ''}`}
                    onClick={() => handleSectionClick(i)}
                  ></button>
                ))}  
                </div>
                <section id="section1" style={sectionStyle} onClick={() => handleSectionClick(0)}>
                  <Main1 />
                </section>
                <section id="section2" style={sectionStyle} onClick={() => handleSectionClick(1)}>
                <Main2 />
                </section>
                <section id="section3" style={sectionStyle} onClick={() => handleSectionClick(2)}>
                <Main3 />
                </section>
                <section id="section4" style={sectionStyle} onClick={() => handleSectionClick(3)}>
                  <Main4 />
                </section>
              </div>
              
              </>
              } 
            />
            
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/mynav" element={<MyNav />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="community" element={<Community />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/category" element={<Category />} />
            {/* <Route path="/mainnav" element={<MainNav />} /> */}
            <Route path="/main1" element={<Main1 />} />
            <Route path="/main2" element={<Main2 />} />
            <Route path="/main3" element={<Main3 />} />
            <Route path="/main4" element={<Main4 />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postmodal" element={<PostModal />} />
            
            <Route path="/asianfood" element={<AsianFood />} />
            <Route path="/chinesefood" element={<ChineseFood />} />
            <Route path="/japanesefood" element={<JapaneseFood />} />
            <Route path="/koreanfood" element={<KoreanFood />} />
            <Route path="/westernfood" element={<WesternFood />} />
            <Route path="/snack" element={<Snack />} />

            <Route path="/mycalendar" element={<MyCalendar />} />
            <Route path="/mymodal" element={<MyModal />} />
            <Route path="/game" element={<Game />} />
            <Route path="/survey" element={<Survey />} />




          </Routes>  
        </div>
      </div>
  
  );
}

export default App;