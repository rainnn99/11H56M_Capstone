import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import MyNav from "../MyNav";
import axios from "axios";

function PostList() {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const fetchPosts = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   const data = await response.json();
  //   setPosts(data);
  // };
  const axiosPosts = async () => {
    try {
      const response = await axios.get("/community/lists");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosPosts();
  }, []);

  const indexOfLastPost = currentPage * 15;
  const indexOfFirstPost = indexOfLastPost - 15;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  

  const renderPosts = currentPosts.map((post) => { //게시글 보여주는 부분
    return (
      // .id, .title같은 부분을 백엔드 변수로 바꿔주면 됨
      <div key={post.id} className="post"> 
        <p className="post-meta">
          <span className="post-num">{post.id}</span>
          <span className="post-title" onClick={() => renderPostDetails(post)}>
            {post.title}
          </span>
          {/* <span className="post-author">{`작성자: ${post.userId}`}</span> */}
        </p>
      </div>
    );
  });

  const renderPostDetails = () => {
    if (selectedPost) {
      return (
        <div className="post-details">
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </div>
      );
    }
  };

  //1234567 처럼 글 개수대로 페이지 숫자 저장
  
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(posts.length / 15); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        onClick={() => setCurrentPage(number)} // 페이지 번호 누르면 (페이지번호에 있는)현재페이지로
        className={currentPage === number ? "active" : ""}
      >
        {number}
      </li>
    );
  });

  return (
    <>
    <MyNav />
      <div className="boardLogo">
        자유게시판
      </div>
      <div className="boardCategory">
        <div className="board_id">번호</div>
        <div className="board_title">글제목</div>
        <div className="board_search">
          <input className="board_input" type="text" placeholder="글 제목 검색"></input>
          <img className="search_img" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
        </div>
      </div>
      <hr className="boardHr" style={{border:" solid 2px black"}}></hr>


      <div className="board">
        <div className="posts">{renderPosts}</div>
      </div>
      <div className="underPosts">
        <div className="pageNumWrap">
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
        <button className="writeBtn" onClick={handleShowModal}>글 작성</button>
        <PostModal show={showModal} handleClose={handleCloseModal}>
          <form>
            <label>
              제목:
              <input type="text" name="title" />
            </label>
            <label>
              내용:
              <textarea name="content"></textarea>
            </label>
            <button type="submit">작성</button>
          </form>  
        </PostModal>

      </div>
    </>
  );
}

export default PostList;
