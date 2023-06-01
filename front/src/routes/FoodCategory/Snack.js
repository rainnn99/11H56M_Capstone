import { Container, Row, Col, Figure } from "react-bootstrap";
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import MyNav from "../../MyNav";
import Map from "../../Map";

function Snack() {
 const photos = [ 
    { src: "/SnackImg/img37.jpg", caption: "마라 떡볶이",text:"마라상하이",text2:"삼첩분식", text3: "웅떡" },
    { src: "/SnackImg/img38.jpg", caption: "로제 떡볶이",text:"오월떡볶이",text2:"스텔라떡볶이"  },
    { src: "/SnackImg/img39.jpg", caption: "파닭",text:"바른치킨" },
    { src: "/SnackImg/img40.jpg", caption: "닭발" ,text:"오빠닭발",text2:"빵구네닭발", text3: "한남동그집"},
    { src: "/SnackImg/img41.jpg", caption: "골뱅이 무침" },
    { src: "/SnackImg/img42.jpg", caption: "낙곱새",text:"국민낙곱새",text2:"개미집", text3: "용호동낙지" },
    { src: "/SnackImg/img43.jpg", caption: "곱도리탕",text:"원조한우곱도리탕 "},
    { src: "/SnackImg/img44.jpg", caption: "족발",text:"약선족발",text2:"우만동족발집", text3: "돈발"  },
    { src: "/SnackImg/img45.jpg", caption: "타코야끼" },
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
      <div className="FoodName"style={{ marginBottom: '-50px'}} >분식</div>
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

export default Snack;