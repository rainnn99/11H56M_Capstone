import { Container, Row, Col, Figure } from "react-bootstrap";

function WesternFood() {
  const photos = [ 
    { src: "/WesternImg/img10.jpg", caption: "리조또" },
    { src: "/WesternImg/img16.jpg", caption: "크림 빠네" },
    { src: "/WesternImg/img12.jpg", caption: "스테이크" },
    { src: "/WesternImg/img13.jpg", caption: "크림 스파게티" },
    { src: "/WesternImg/img14.jpg", caption: "타코" },
    { src: "/WesternImg/img15.jpg", caption: "투움바 파스타" },
    { src: "/WesternImg/img11.jpg", caption: "크림 뇨끼" },
    { src: "/WesternImg/img17.jpg", caption: "샌드위치" },
    { src: "img9.jpg", caption: "피자" },
  ];

  return (
    <div>
      <div className="FoodName">
        <h1>양식</h1>
      </div>

      <div>
        <hr className="line" />
      </div>

      <div className="FoodImg">
        <Container>
          <Row xs={1} md={3} className="g-4" style={{ border: "none" }}>
            {photos.map((photo, index) => (
              <Col key={index}>
                <Figure>
                  <Figure.Image
                    src={photo.src}
                    thumbnail
                    style={{ width: "400px", height: "450px", border: "none" }}
                  />
                  <Figure.Caption>{photo.caption}</Figure.Caption>
                </Figure>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default WesternFood;