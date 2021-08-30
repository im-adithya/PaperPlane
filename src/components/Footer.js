import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";

import paperplane from "../assets/paperplane.svg";

const Footer = () => {
  return (
    <Container fluid className="position-relative">
      <Image
        src={paperplane}
        className="position-absolute top-0 start-50 translate-middle zindex1 paperplane"
        fluid
      />
      <Row expand="lg" className="h-100">
        <Col
          xs={12}
          className="pt-5 pb-4"
          style={{ backgroundColor: "#E6E6E6" }}
        >
          <Row>
            <Col className="mt-3 mt-md-4 mb-2 copywrite text-center">
              Folded by{" "}
              <a
                href="https://github.com/im-adithya"
                className="pointer nounderline rainbow_text_animated"
                target="_blank"
                rel="noreferrer"
              >
                the_hyperboy
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
