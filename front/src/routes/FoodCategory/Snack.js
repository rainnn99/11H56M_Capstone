import { Container, Row, Col, Figure } from "react-bootstrap";

function Snack() {
  const photos = [ 
    { src: "/SnackImg/img37.jpg", caption: "마라 떡볶이" },
    { src: "/SnackImg/img38.jpg", caption: "로제 떡볶이" },
    { src: "/SnackImg/img39.jpg", caption: "파닭" },
    { src: "/SnackImg/img40.jpg", caption: "닭발" },
    { src: "/SnackImg/img41.jpg", caption: "골뱅이 무침" },
    { src: "/SnackImg/img42.jpg", caption: "낙곱새" },
    { src: "/SnackImg/img43.jpg", caption: "곱도리탕" },
    { src: "/SnackImg/img44.jpg", caption: "족발" },
    { src: "/SnackImg/img45.jpg", caption: "타코야끼" },
  ];

  return (
    <div>
      <div className="FoodName">
        <h1>분식</h1>
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

export default Snack;