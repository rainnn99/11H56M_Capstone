import { Container, Row, Col, Figure } from "react-bootstrap";

function KoreanFood() {
  const photos = [ 
    { src: "/KoreanImg/img46.jpg", caption: "갈치 조림" },
    { src: "/KoreanImg/img47.jpg", caption: "감자탕" },
    { src: "/KoreanImg/img48.jpg", caption: "김치 수제비" },
    { src: "/KoreanImg/img49.jpg", caption: "콩국수" },
    { src: "/KoreanImg/img50.jpeg", caption: "돼지고기 짜글이" },
    { src: "/KoreanImg/img51.jpg", caption: "갈비탕" },
    { src: "/KoreanImg/img52.jpg", caption: "콩나물 불고기" },
    { src: "/KoreanImg/img53.jpg", caption: "소곱창" },
    { src: "/KoreanImg/img54.jpg", caption: "추어탕" },
  ];

  return (
    <div>
      <div className="FoodName">
        <h1>한식</h1>
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

export default KoreanFood;