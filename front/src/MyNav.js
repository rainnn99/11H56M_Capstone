import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
} from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { RiLeafFill } from "react-icons/ri";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function MyNav() {

  let navigate = useNavigate();

  const navList = [
    { id: 0, name: "HOME" },
    { id: 1, name: "INTRODUCE" },
    { id: 2, name: "RESTAURANT" },
    { id: 3, name: "COMMUNITY" },
    { id: 4, name: "SHOP" }
  ];
  let [currentClick, setCurrentClick] = useState("");

  // const activeStyle = {
  //   color: "#009900",
  //   fontweight: 700,
  // };

  const getClick = (e) => {
     setCurrentClick(e.target.id);
   };

  // useEffect(
  //   (e) => {
  //     if (currentClick !== null) {
  //       let current = document.getElementById(currentClick);
  //       current.style.color="#009900";
  //       // current.style.borderBottom = "2px solid";
  //       // current.style.borderBottomColor = "#1c28f4";
  //     }
  //   },
  //   [currentClick]
  // );

  return (
    <div className="myNav">
        <div className="navbarWrap">
          <div className="navBasic">
            <Navbar className="logo"  onClick={() => {
                  navigate("/");
               }}>이거먹자<GiForkKnifeSpoon /></Navbar>
            
            {/* <div className="searchWrap">
              <div className="search">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    className="me-2"
                    aria-label="Search"

                    style={{textAlign:"left"}}
                  />
                </Form>
              </div>
              <button className="btnSearch">
                <div className="searchFont">
                  <ImSearch />
                </div>
              </button>
            </div> */}

            <div className="rightMenu">
            <div className="logsignWrap">
              <Nav.Link className="logIn"
               onClick={() => {
                  navigate("/login");
               }}
              >로그인</Nav.Link>
              <Nav.Link className="signUp"
                onClick={() => {
                  navigate("/signup");
              }}
              >회원가입</Nav.Link>
            </div>

            <div className="myFunc">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <ShoppingCartIcon onClick={() => {
                  navigate("/cart");
              }}/>
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle onClick={() => {
                  navigate("/mypage");
              }} />
              </IconButton>
            </div>  
            </div>

            

          </div>

 
          {/* <div className="navMenu">
            <Navbar className="navmenuWrap">
              <Nav.Link className="home"
               onClick={() => {
                  navigate("/");
               }}
              >
                홈
              </Nav.Link>
              <Nav.Link className="intro" >
                식당/음식점
              </Nav.Link>
              <Nav.Link className="rest" 
                onClick={() => {
                  navigate("/restaurant");
               }}
              >
                카페
              </Nav.Link>
              <Nav.Link className="comm" >
                건강식
              </Nav.Link>
              <Nav.Link className="shop" 
              onClick={() => {
                navigate("/community");
             }}>
                커뮤니티
              </Nav.Link>
            </Navbar>
          </div> */}
        </div> 
      
    </div>
  );
}

export default MyNav;
