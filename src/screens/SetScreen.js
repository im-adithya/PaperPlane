import React, { useContext } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";

import { AuthContext } from "../Auth";
import CopyLink from "../components/CopyLink";
import Footer from "../components/Footer";
import Helper from "../components/Helper";

import flyingplane from "../assets/flying-plane.svg";

const SetScreen = () => {
  const helper = useContext(AuthContext).helper.helper;
  return (
    <div className="flex-wrapper">
      {helper && <Helper />}
      <Container className="p-x d-md-flex justify-content-center align-items-center">
        <Row className="mt-md-5">
          <Col md={{ span: 8, offset: 2 }} className="mt-5 mt-md-0">
            <h2 className="mt-5 headline-3">
              That’s it! You are all set to fly!
            </h2>
            <Image
              src={flyingplane}
              className="my-5 mx-auto d-block"
              width="35%"
              fluid
            />
          </Col>
          <Col xs={12} md={{ span: 8, offset: 2 }}>
            <CopyLink />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SetScreen;
