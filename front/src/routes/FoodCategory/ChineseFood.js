import { Container, Row, Col, Figure } from "react-bootstrap";

function ChineseFood() {
  const photos = [
    { src: "/ChineseImg/img1.jpg", caption: "짜장면" },
    { src: "/ChineseImg/img2.jpg", caption: "유린기" },
    { src: "/ChineseImg/img3.jpg", caption: "탕수육" },
    { src: "/ChineseImg/img4.jpg", caption: "마라탕" },
    { src: "/ChineseImg/img5.jpeg", caption: "깐풍기" },
    { src: "/ChineseImg/img6.jpg", caption: "마라샹궈" },
    { src: "/ChineseImg/img7.jpg", caption: "마파두부" },
    { src: "/ChineseImg/jpg8.jpg", caption: "양장피" },
    { src: "/ChineseImg/img9.jpg", caption: "팔보채" },
  ];

  return (
    <div>
      <div className="FoodName">
        <h1>중식</h1>
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

export default ChineseFood;