import React from "react";
import "./../Modal.css"

function PostModal(props) {
    const { handleClose, show, children } = props;
  
    const modalDisplay = show ? "block" : "none";
  
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
                <input type="text" className="titleInput" style={{width:"500px"}}
                placeholder="제목을 입력하세요"></input>
            </div>
            <div className="writeContentWrap" style={{display:"flex",marginLeft:"50px"}}>
                <p className="writeContent" style={{marginRight:"60px"}}>글내용</p>
                <textarea className="contentInput" style={{width:"500px", height:"360px"}}
                placeholder=" -불쾌감을 주는 욕설과 광고는 삭제될 수 있습니다. 
                &#13;&#10;&#13;&#10;-소개해주고 싶은 맛집이나 오늘 먹은 음식을 자랑해보세요!
                -오늘 저녁 메뉴 추천을 해주세요.">    
                </textarea>
            </div>
            <button className="postWriteBtn">등록</button>
          </div>
        </div>
      </div>
    );
  }
  

export default PostModal;