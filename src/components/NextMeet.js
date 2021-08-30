import React from "react";
import { Row, Col, Image } from "react-bootstrap";

import { PROPER_SCHEDULERS } from "../constants/properSchedulers";

import planeicon from "../assets/plane-icon.svg";
import meet from "../assets/gmeetlogo.svg";
import zoom from "../assets/zoomlogo.svg";
import webex from "../assets/webexlogo.svg";

const NextMeet = ({ className, destination }) => {
  return (
    <Row className={className}>
      <Col
        style={{
          backgroundColor:
            "var(--" + PROPER_SCHEDULERS[new Date().getDay()] + ")",
        }}
        className="round"
      >
        <Row className="py-2 round d-flex align-items-center">
          <Col
            xs={2}
            md={2}
            className="px-1 d-flex justify-content-center align-items-center"
          >
            <Image
              src={
                destination.platform === "gmeet"
                  ? meet
                  : destination.platform === "zoom"
                  ? zoom
                  : destination.platform === "webex"
                  ? webex
                  : planeicon
              }
              className="nextmini"
            />
          </Col>
          <Col
            xs={5}
            md={6}
            className="d-flex flex-column justify-content-center"
          >
            <Row className="headline-5 scroll-x">{destination.title}</Row>
            <Row className="headline-6 scroll-x">{destination.code}</Row>
          </Col>
          <Col
            xs={5}
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Row className="headline-5">
              {destination.startTime}:00 -{" "}
              {destination.startTime + destination.duration}:00
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NextMeet;
