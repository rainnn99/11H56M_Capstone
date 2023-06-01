import React from "react";
import MyNav from "./../MyNav";
import { useNavigate } from "react-router-dom";

function Category() {
  let navigate = useNavigate();

  return (
    <div className="categoryPage">
      <MyNav />
      <p className="categoryTitle">오늘 뭐 먹을까?</p>
      <div className="categoryWrap">
        <div className="kacWrap">
          <div className="categoryItems">
            <img
              src="/img1.png"
              style={{ width: "130px", height: "130px" }}
              onClick={() => {
                navigate("/koreanfood");
              }}
            />
            <p className="categoryText">한식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img6.png"
              style={{ width: "130px", height: "130px" }}
              onClick={() => {
                navigate("/japanesefood");
              }}
            />
            <p className="categoryText">일식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img4.png"
              style={{ width: "130px", height: "130px" }}
              onClick={() => {
                navigate("/chinesefood");
              }}
            />
            <p className="categoryText">중식</p>
          </div>
        </div>

        <div className="jnsWrap">
          <div className="categoryItems">
            <img
              src="/img7.png"
              style={{ width: "130px", height: "130px" }}
              onClick={() => {
                navigate("/weternfood");
              }}
            />
            <p className="categoryText">양식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img8.png"
              style={{ width: "130px", height: "130px" }}
              onClick={() => {
                navigate("/snack");
              }}
            />
            <p className="categoryText">분식</p>
          </div>
          <div className="categoryItems">
            <img
              src="/img3.png"
              style={{ width: "130px", height: "130px" }}
              onClick={() => {
                navigate("/asianfood");
              }}
            />
            <p className="categoryText">아시안</p>
          </div>
        </div>

        <div className="thinkImage" style={{ position: "absolute", top: "0", left: "0",marginTop: '300px',marginLeft: '160px' }}>
          <img
            src="./think1.png"
            style={{ width: "280px", height: "450px" }}
          />
        </div>
        <div className="thinkImage" style={{ position: "absolute", bottom: "0",right: "0",marginRight: '100px'}}>
          <img
            src="./think2.png"
            style={{ width: "440px", height: "500px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;