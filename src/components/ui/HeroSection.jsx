import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="12" md="12">
            <div className="hero__content">
              <h2>
              Discover, Collect, And <br/>
                <span>Sell Extraordinary</span> NFTs, <br/>Currencies And GiftCards
              </h2>
              <div className="hero__btns d-flex align-items-center gap-4">
                <div className="borderr">
                <button className=" create__btn d-flex align-items-center gap-2">
                  <i class="ri-ball-pen-line"></i>
                  <Link to="/create">Create</Link>
                </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
