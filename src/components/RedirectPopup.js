import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import NextMeet from "./NextMeet";

const RedirectPopup = ({ className, destination, close }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [open, setOpen] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(timeLeft ? timeLeft - 1 : timeLeft);
    }, 1000);
    setTimeout(() => {
      setRedirect(true);
    }, 5000);
    if (redirect && open) window.location = destination.code;
  });

  return (
    <Row
      className={`popup p-3 zindex10 redirect land round position-absolute start-50 translate-middle m-0 ${className}`}
    >
      <Col>
        <Row>
          <Col className="text-left redirect-text mb-2">
            You are being redirected in{" "}
            <span className="blink">{timeLeft}:00</span> to:
          </Col>
        </Row>
        <NextMeet destination={destination} className="px-2" />
        <Row>
          <Col className="mt-4 d-flex justify-content-between">
            <Button
              variant="danger"
              className="px-3"
              onClick={() => {
                setOpen(false);
                close(false);
              }}
            >
              Stop
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setOpen(false);
                close(false);
                window.location = destination.code;
              }}
            >
              Go Now!
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RedirectPopup;
