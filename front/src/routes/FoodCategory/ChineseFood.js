import { Container, Row, Col, Figure } from "react-bootstrap";
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import MyNav from "../../MyNav";
import Map from "../../Map";

function ChineseFood() {
  const photos = [
    { src: "/ChineseImg/img1.jpg", caption: "짜장면",text:"식성중화요리",text2:"홍굴이", text3: ""},
    { src: "/ChineseImg/img2.jpg", caption: "유린기",text:"샤오롱 중화요",text2:"준화반점", text3: "맛있는중식 차이리" },
    { src: "/ChineseImg/img3.jpg", caption: "탕수육" },
    { src: "/ChineseImg/img4.jpg", caption: "마라탕",text:"찐하오마라탕 ",text2:"탕화원", text3: "라화쿵부 ",text4:"라홍방마라탕" },
    { src: "/ChineseImg/img5.jpeg", caption: "깐풍기" },
    { src: "/ChineseImg/img6.jpg", caption: "마라샹궈" },
    { src: "/ChineseImg/img7.jpg", caption: "마파두부" ,text:"샤오롱",text2:"용문각"},
    { src: "/ChineseImg/jpg8.jpg", caption: "양장피" },
    { src: "/ChineseImg/img9.jpg", caption: "팔보채" },
  ];

  const [searchText, setSearchText] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredPhotos = photos.filter((photo) =>
      photo.caption.includes(searchText)
    );

    setFilteredPhotos(filteredPhotos);
    setSearchText('');
  };

  return (
    <div>
      <MyNav />
      <div className="FoodName"style={{ marginBottom: '-50px'}} >중식</div>
      <Container style={{ marginBottom: '50px' }}> 
        <Row>
          <Col md={8}>
            <Map />
          </Col>
          <Col md={4} style={{ backgroundColor: "#f9f9f9", maxHeight: "800px", marginTop: "100px" }}>
            <div className="FoodImg" style={{ overflowY: "scroll", maxHeight: "700px" }}>
              <div>
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleChange}
                    placeholder="메뉴를 입력하세요"
                    style={{ width: "300px" }}
                  />
                  <button type="submit" style={{ marginLeft: "20px", borderRadius: "5px" }}><BiSearchAlt2 /></button>
                </form>
              </div>

              <div>
                {filteredPhotos.length > 0 ? (
                  filteredPhotos.map((photo, index) => (
                    <Row key={index} style={{ width: "370px", height: "180px", border: "none" }}>
                      <Col>
                        <Figure>
                          <Figure.Image
                            src={photo.src}
                            thumbnail
                            style={{ width: "150px", height: "160px", border: "none" }}
                          />
                        </Figure>
                      </Col>
                      <Col>
                        <h5 style={{ textAlign: "left" }}>{photo.caption}</h5>
                        <div style={{ marginBottom: '5px' }}>
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text}</p>
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text2}</p>
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text3}</p>
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text4}</p>
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text5}</p>
                        </div>
                      </Col>
                    </Row>
                  ))
                ) : (
                  photos.map((photo, index) => (
                    <Row key={index} style={{ width: "370px", height: "180px", border: "none" }}>
                      <Col>
                        <Figure>
                          <Figure.Image
                            src={photo.src}
                            thumbnail
                            style={{ width: "150px", height: "160px", border: "none" }}
                          />
                        </Figure>
                      </Col>
                      <Col>
                        <h5 style={{ textAlign: "left" }}>{photo.caption}</h5>
                        {photo.text && (
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text}</p>
                        )}
                        {photo.text2 && (
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text2}</p>
                        )}
                        {photo.text3 && (
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text3}</p>
                        )}
                        {photo.text4 && (
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text4}</p>
                        )}
                        {photo.text5 && (
                          <p className="foodtxt" style={{ textAlign: "left", margin: '0' }}>{photo.text5}</p>
                        )}
                      </Col>
                    </Row>
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChineseFood;