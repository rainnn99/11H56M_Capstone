import { Container, Row, Col, Figure } from "react-bootstrap";

function JapaneseFood() {
  const photos = [ 
    { src: "/JapaneseImg/img19.jpg", caption: "마제소바" },
    { src: "/JapaneseImg/img20.jpg", caption: "차슈 돈코츠 라멘" },
    { src: "/JapaneseImg/img21.jpeg", caption: "스키야키" },
    { src: "/JapaneseImg/img22.jpg", caption: "가츠동" },
    { src: "/JapaneseImg/img23.jpg", caption: "밀푀유나베" },
    { src: "/JapaneseImg/img24.jpg", caption: "규동" },
    { src: "/JapaneseImg/img25.jpg", caption: "텐동" },
    { src: "/JapaneseImg/img26.jpg", caption: "오코노미야끼" },
    { src: "/JapaneseImg/img27.jpg", caption: "냉소바" },
  ];

  return (
    <div>
      <div className="FoodName">
        <h1>일식</h1>
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
                    style={{ width: "350px", height: "450px", border: "none" }}
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

export default JapaneseFood;