import { Container, Row, Col, Figure } from "react-bootstrap";
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import MyNav from "../../MyNav";
import Map from "../../Map";

function KoreanFood() {
  const photos = [
   { src: "/KoreanImg/img46.jpg", caption: "갈치 조림", text: "희락갈치", text2: "중앙갈치식당",text3: "희락갈치", text4: "중앙갈치식당" },
    { src: "/KoreanImg/img47.jpg", caption: "감자탕", text: "동화식당", text2: "윤영밥상" ,text3: "생생통영마을", text4: "김명숙아지매순대국",text5: "두원식당" },
    { src: "/KoreanImg/img48.jpg", caption: "김치 수제비",text: "숭례분식", text2:"종로수제비" },
    { src: "/KoreanImg/img49.jpg", caption: "콩국수",text: "서도바지락칼국수", text2:"모임터찜칼국수" ,text3: "담소두부", text4: "예와손만두",text5: "유락손칼국수"  },
    { src: "/KoreanImg/img50.jpeg", caption: "돼지고기짜글이",text: "수원짜글이네", text2:"제육이와짜글이" },
    { src: "/KoreanImg/img51.jpg", caption: "갈비탕",text: "한우누렁소", text2:"혜화면옥" },
    { src: "/KoreanImg/img52.jpg", caption: "콩나물 불고기",text: "개미집투", text2:"냠냠담",text3: "콩불" },
    { src: "/KoreanImg/img53.jpg", caption: "소곱창",text: "곱창고", text2:"대파곱창" },
    { src: "/KoreanImg/img54.jpg", caption: "추어탕",text: "남원정통추어탕", text2:"박성춘남원추어탕",text3: "춘향골", text4: "동강나루터",text5: "남도식당"  },
    { src: "/KoreanImg/55.jpg", caption: "파전",text: "추랑", text2:"막리단길" },
    { src: "/KoreanImg/56.jpeg", caption: "닭볶음탕",text: "목동포차", text2:"가정쌈밥" },
    { src: "/KoreanImg/57.jpg", caption: "국밥",text: "신천순대국", text2:"할머니순대국" ,text3: "합정옥", text4: "망원동돼지국밥",text5: "황남국밥" },
    { src: "/KoreanImg/58.jpg", caption: "돈까스",text: "시올돈", text2:"온달왕돈까스" },
    { src: "/KoreanImg/59.webp", caption: "우곱창전골",text: "홍추곱창카페", text2:"궁뎅이 곱창막창",text3: "황곱", text4: "대박황소곱창",text5: "교수곱창"  },
    { src: "/KoreanImg/60.jpg", caption: "갈비찜",text: "중경당", text2:"진고개" },
    { src: "/KoreanImg/61.jpg", caption: "삼겹살",text: "꾸이꾸이멱살", text2:"석쇠집" },
    { src: "/KoreanImg/62.jpg", caption: "냉면",text: "돈암돈집", text2:"낙산냉면",text3: "칡냉면", text4: "얼큰이왕냉면",text5: "밀면집"  },
    { src: "/KoreanImg/63.jpg", caption: "미역국",text: "동묘집", text2:"백만원식당" },
    { src: "/KoreanImg/64.jpg", caption: "시래기된장국",text: "들깨시래기된장국", text2:"촌놈시래기국" }, 
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
      
      <div className="FoodName"style={{ marginBottom: '-50px'}} >한식</div>
      <Container style={{ marginBottom: '30px' }}> 
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
// KoreanFood.js
export default KoreanFood;