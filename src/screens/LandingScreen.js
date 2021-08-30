import React, { useContext } from "react";
import { Button, Row, Col, Container, Image } from "react-bootstrap";

import { userLogin } from "../actions/userLogin";
import { AuthContext } from "../Auth";
import Footer from "../components/Footer";
import Helper from "../components/Helper";
import heroimage from "../assets/display.svg";

const LandingScreen = () => {
  const user = useContext(AuthContext).currentUser;
  const helper = useContext(AuthContext).helper.helper;
  const redirHome = () => {
    window.location = "/home";
  };

  return (
    <div className="flex-wrapper">
      {helper && <Helper />}
      <Container className="p-x d-md-flex mt-md-5 justify-content-center align-items-center">
        <Row className=" mt-md-5">
          <Col lg={6} className="mb-2 mb-md-0">
            <h1 className="mt-5 headline-1">
              Attend all your meetings with one link.
            </h1>
            <div className="mt-3 headline-2">
              Goodbye bookmarks. Enter all your links for once and get
              redirected to all your meets in your paper plane!
            </div>
            <Button
              variant="primary"
              className="mt-3 mt-md-5 px-3 mb-3"
              onClick={user ? redirHome : userLogin}
            >
              {user ? "Home" : "Sign in"}
            </Button>
          </Col>
          <Col
            lg={6}
            xs={{ order: "first" }}
            md={{ order: "last" }}
            className="mt-5 d-flex justify-content-center align-items-center"
          >
            <Image src={heroimage} className="mt-5" width="65%" fluid />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingScreen;
