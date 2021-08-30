import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";

import planeicon from "../assets/plane-icon.svg";
import meet from "../assets/gmeetlogo.svg";
import zoom from "../assets/zoomlogo.svg";
import webex from "../assets/webexlogo.svg";

const MeetingCell = ({
  day,
  extension,
  open,
  close,
  cellDetails,
  setCellDetails,
}) => {
  return (
    <Container
      className="h-100 w-100 rounded d-flex align-items-center px-0 justify-content-center"
      style={{ backgroundColor: "var(--" + day + ")" }}
      onClick={() => {
        close(!open);
        cellDetails.edit = true;
        setCellDetails(cellDetails);
      }}
    >
      {!extension ? (
        <Row
          className="h-100 w-100"
          style={{ width: "calc(140px - 0.3rem) !important" }}
        >
          <Col xs={3} className="d-flex align-items-center py-0 pr-0 pl-1">
            <Image
              src={
                cellDetails.platform === "gmeet"
                  ? meet
                  : cellDetails.platform === "zoom"
                  ? zoom
                  : cellDetails.platform === "webex"
                  ? webex
                  : planeicon
              }
              className="d-block"
            />
          </Col>
          <Col
            xs={9}
            className="d-flex flex-column justify-content-center px-0"
          >
            <div className="cell-meet-text-1 ml-1 mr-2 text-left scroll-x">
              {cellDetails.title}
            </div>
            <div className="cell-meet-text-2 ml-1 mr-2 text-left scroll-x">
              {cellDetails.code}
            </div>
            {/*<marquee behavior="scroll" direction="left" scrollamount= "2" className="cell-meet-text-2 text-left scroll-x">{code}</marquee>*/}
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default MeetingCell;
