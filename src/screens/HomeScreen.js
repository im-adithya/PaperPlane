import React, { useContext, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../Auth";
import Footer from "../components/Footer";
import Helper from "../components/Helper";
import NextMeet from "../components/NextMeet";
import CopyLink from "../components/CopyLink";
import RedirectPopup from "../components/RedirectPopup";

const HomeScreen = () => {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const { currentUser, upComing, flyDestination, helper } =
    useContext(AuthContext);
  const userName = currentUser.displayName.split(" ")[0].toLowerCase();
  const fromFly = history.location.state?.from;

  const today = new Date();
  const hour = today.getHours();

  return (
    <div className="flex-wrapper">
      {flyDestination && open && (
        <RedirectPopup destination={flyDestination} close={setOpen} />
      )}
      {helper.helper && <Helper />}
      <Container className="text-center mb-5 mb-md-0">
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="mt-5">
            <h2 className="mt-5 headline-3">
              {fromFly
                ? "No meeting is scheduled at the moment!"
                : "Good " +
                  (hour < 12
                    ? "Morning"
                    : hour > 16
                    ? "Evening"
                    : "Afternoon") +
                  ", " +
                  userName.charAt(0).toUpperCase() +
                  userName.slice(1) +
                  "!"}
            </h2>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <Row className="d-flex justify-content-center">
              <Col className="max-480">
                <h2 className="headline-7 text-left">Upcoming Today</h2>
              </Col>
            </Row>
            <div className="d-flex flex-column align-items-center">
              {!upComing.length ? (
                <div className="background-colorful mt-3 p-1 d-flex justify-content-center align-items-center round font-bold max-480 w-100">
                  Done for the day, sit back and relax!
                </div>
              ) : (
                upComing.map((destination, idx) => {
                  return (
                    <NextMeet
                      className="py-1 max-480 w-100"
                      destination={destination}
                      key={idx}
                    />
                  );
                })
              )}
            </div>
            <Row className="mt-4">
              <Col>
                <CopyLink />
              </Col>
            </Row>
          </Col>
        </Row>
        <Button
          className="big-circ-btn m-4 m-lg-5 zindex1"
          onClick={() => history.push("/schedule")}
        >
          Edit Schedule
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default HomeScreen;
