import { Container, Row, Col, Figure } from "react-bootstrap";
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import MyNav from "../../MyNav";
import Map from "../../Map";

function JapaneseFood() {
  const photos = [
    { src: "/JapaneseImg/img19.jpg", caption: "마제소바",text: "콘부", text2: "파동",text3: "교레츠라멘", text4: "지로우라멘" },
    { src: "/JapaneseImg/img20.jpg", caption: "차슈 돈코츠 라멘" },
    { src: "/JapaneseImg/img21.jpeg", caption: "스키야키", text: "훈", text2: "도쿄라보",text3: "시오", text4: "세계단"},
    { src: "/JapaneseImg/img22.jpg", caption: "가츠동",text: "홍대돈부리", text2: "아비꼬",text3: "문래동훈카츠", text4: "카츠야미" },
    { src: "/JapaneseImg/img23.jpg", caption: "밀푀유나베",text: "주마왕", text2: "나니별관",text3: "주섬주섬" },
    { src: "/JapaneseImg/img24.jpg", caption: "규동" },
    { src: "/JapaneseImg/img25.jpg", caption: "텐동" },
    { src: "/JapaneseImg/img26.jpg", caption: "오코노미야끼" },
    { src: "/JapaneseImg/img27.jpg", caption: "냉소바",text: "본가츠", text2: "역전우동",text3: "스시범", text4: "손가네" },
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
      <div className="FoodName"style={{ marginBottom: '-50px'}} >일식</div>
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

export default JapaneseFood;