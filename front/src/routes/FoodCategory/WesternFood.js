import { Container, Row, Col, Figure } from "react-bootstrap";
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import MyNav from "../../MyNav";
import Map from "../../Map";

function WesternFood() {
 const photos = [ 
    { src: "/WesternImg/img10.jpg", caption: "리조또" ,text:"열린지혜의맛",text2:"요녀석", text3: "썬파스타"},
    { src: "/WesternImg/img16.jpg", caption: "크림 빠네",text:"이태리숲",text2:"페스타마레 ", text3: "달리181" },
    { src: "/WesternImg/img12.jpg", caption: "스테이크",text:"아브라치오",text2:"열한시삼십사분 " },
    { src: "/WesternImg/img13.jpg", caption: "크림 스파게티",text:"인생은파스타입니다 ",text2:"썬파스타 ", text3: "열린지혜의맛", text4:"아브라치오", text5:"레미따" },
    { src: "/WesternImg/img14.jpg", caption: "타코",text:"MAG&MAC",text2:"옐로우피자" },
    { src: "/WesternImg/img15.jpg", caption: "투움바 파스타" },
    { src: "/WesternImg/img11.jpg", caption: "크림 뇨끼" },
    { src: "/WesternImg/img17.jpg", caption: "샌드위치",text:"샐로브레",text2:"올라솔" },
    { src: "img9.jpg", caption: "피자" },
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
      <div className="FoodName"style={{ marginBottom: '-50px'}} >양식</div>
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

export default WesternFood;