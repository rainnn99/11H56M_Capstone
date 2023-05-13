import { Container, Row, Col, Figure } from "react-bootstrap";

function AsianFood() {
  const photos = [ 
    { src: "/AsianImg/img28.jpg", caption: "팟타이" },
    { src: "/AsianImg/img29.jpg", caption: "분짜" },
    { src: "/AsianImg/img30.jpg", caption: "쌀국수" },
    { src: "/AsianImg/img31.jpg", caption: "똠양꿍" },
    { src: "/AsianImg/img32.jpg", caption: "나시고랭" },
    { src: "/AsianImg/img33.jpg", caption: "짜조" },
    { src: "/AsianImg/img34.jpg", caption: "푸팟퐁커리" },
    { src: "/AsianImg/img35.jpg", caption: "반미" },
    { src: "/AsianImg/img36.jpg", caption: "월남쌈" },
  ];

  return (
    <div>
      <div className="FoodName">
        <h1>아시안</h1>
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

export default AsianFood;