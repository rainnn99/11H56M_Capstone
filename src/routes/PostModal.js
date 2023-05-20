import React, { useEffect, useState } from "react";
import "./../Modal.css"
import axios from "axios";

function PostModal(props) {
    const { handleClose, show, children } = props;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(""); //실제 사용자 아이디를 저장할 상태 변수

    useEffect(() => {
      const storedUserId = localStorage.getItems("userId");
      setUserId("storedUserId");
    }, []);
  
    const modalDisplay = show ? "block" : "none";

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }
    const handleContentChange = (e) => {
      setTitle(e.target.value);
    }

    const handlePostSubmit = () => {
      if (!title || !content) {
        alert("제목과 내용을 입력해주세요!");
        return;
      }
  
      const userId = "exampleUser"; // Replace with the actual user ID
  
      const postData = {
        title: title,
        content: content,
      };
  
      axios
        .post(`/community/${userId}/new-writing`, postData)
        .then((response) => {
          console.log(response.data);
          setTitle("");
          setContent("");
          handleClose(); // 모달 닫기
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("게시글 작성에 실패했습니다. 나중에 다시 시도해주세요.");
        });
    };

    return (
      <div className="modal" style={{ display: modalDisplay }}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>

          <div className="modalTitle">게시글 작성</div>

          <div className="modalContent" style={{marginTop:"60px"}}>
            <div className="writeTitleWrap" style={{display:"flex",marginLeft:"50px", marginBottom:"20px"}}>
                <p className="writeTitle" style={{marginRight:"60px"}}>글제목</p>
                <input 
                  type="text" className="titleInput" style={{width:"500px"}}
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={handleTitleChange}
                ></input>
            </div>

            <div className="writeContentWrap" style={{display:"flex",marginLeft:"50px"}}>
              <p className="writeContent" style={{marginRight:"60px"}}>글내용</p>
              <textarea className="contentInput" style={{width:"500px", height:"360px"}}
                placeholder=" -불쾌감을 주는 욕설과 광고는 삭제될 수 있습니다. 
                &#13;&#10;&#13;&#10;-소개해주고 싶은 맛집이나 오늘 먹은 음식을 자랑해보세요!
                -오늘 저녁 메뉴 추천을 해주세요."
                value={content}
                onChange={handleContentChange}
              ></textarea>
            </div>
            <button className="postWriteBtn" onClick={handlePostSubmit}>등록</button>
          </div>
        </div>
      </div>
    );
  }
  

export default PostModal;