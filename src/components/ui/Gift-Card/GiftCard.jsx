import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./gift-card.css";
import { GIFTCARD__DATA } from "../../../assets/data/data";

const GiftCard = () => {
  return (
    <section className="sectionn">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h3 className="trending__title">GiftCard</h3>
          </Col>

          {GIFTCARD__DATA.map((item) => (
            <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
              <img src={item.giftcardImg} alt="" className="w-100 radiuss" />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default GiftCard;
