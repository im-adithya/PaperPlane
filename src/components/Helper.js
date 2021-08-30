import React, { useRef, useEffect, useState, useContext } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { HELP_STEPS } from "../constants/helpSteps";

import { AuthContext } from "../Auth";
import planeicon from "../assets/plane-icon.svg";
import cross from "../assets/cross-icon.svg";

import step1 from "../assets/screenshots/step-1.png";
import step2 from "../assets/screenshots/step-2.png";
import step3 from "../assets/screenshots/step-3.png";
import step4 from "../assets/screenshots/step-4.png";
import step5 from "../assets/screenshots/step-5.png";
import step6 from "../assets/screenshots/step-6.png";

import next from "../assets/next-icon.svg";
import prev from "../assets/prev-icon.svg";

const Helper = ({ className }) => {
  const ref = useRef(null);
  const [page, setPage] = useState(1);
  const setHelper = useContext(AuthContext).helper.setHelper;

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setHelper(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, close]);

  const forward = () => {
    if (page != 1) setPage(page - 1);
  };
  const backward = () => {
    if (page != 6) setPage(page + 1);
  };

  const image = () => {
    switch (page) {
      case 1:
        return step1;
      case 2:
        return step2;
      case 3:
        return step3;
      case 4:
        return step4;
      case 5:
        return step5;
      case 6:
        return step6;
      default:
        return;
    }
  };

  return (
    <Container
      className={`zindex10 position-absolute translate-middle top-50 start-50 ${className}`}
    >
      <Row>
        <Col
          ref={ref}
          xs={{ span: 10, offset: 1 }}
          lg={{ span: 6, offset: 3 }}
          className="popup round"
        >
          <Row>
            <Col
              style={{ backgroundColor: "var(--bs-blue)" }}
              className="round-top"
            >
              <div className="d-flex justify-content-between align-items-center my-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Image src={planeicon} width="40px" />
                  <h2 className="headline-4 mb-0 ml-2">How to Fold and Fly</h2>
                </div>
                <div
                  className="headline-4 pointer"
                  onClick={() => setHelper(false)}
                >
                  <Image src={cross} width="10px" className="mr-2" />
                </div>
              </div>
            </Col>
          </Row>
          <Container className="px-2 px-md-4 py-3">
            <Row>
              <Col className="text-center headline-8">
                <span className="headline-9">Step {page}: </span>
                {HELP_STEPS[page - 1]}
              </Col>
            </Row>
            <Row>
              <Image src={image()} className="my-3 p-0 round shadow" />
            </Row>
            <Row>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <Image
                  src={prev}
                  width="25px"
                  className={"m-2 " + (page === 1 ? "" : "pointer")}
                  onClick={forward}
                  style={{ opacity: page === 1 ? 0.5 : 1 }}
                />
                <Image
                  src={next}
                  width="25px"
                  className={"m-2 " + (page === 6 ? "" : "pointer")}
                  onClick={backward}
                  style={{ opacity: page === 6 ? 0.5 : 1 }}
                />
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Helper;
