import React, { useRef, useState, useEffect, useContext } from "react";
import { Alert, Button, Row, Col, Container, Image } from "react-bootstrap";
import validator from "validator";
import { ScheduleContext } from "../screens/ScheduleScreen";
import { addProtocol } from "../actions/addProtocol";
import { INITIAL_CELL_DETAILS } from "../constants/initCellDetails";
import { SCHEDULERS } from "../constants/schedulers";

import planeicon from "../assets/plane-icon.svg";
import clock from "../assets/clock-icon.svg";
import platform from "../assets/platform-icon.svg";
import title from "../assets/title-icon.svg";
import link from "../assets/link-icon.svg";
import repeat from "../assets/repeat-icon.svg";
import cross from "../assets/cross-icon.svg";
import up from "../assets/arrow-up.svg";
import down from "../assets/arrow-down.svg";

import meetlogo from "../assets/gmeetlogo.svg";
import zoomlogo from "../assets/zoomlogo.svg";
import webexlogo from "../assets/webexlogo.svg";

const AddDestination = ({
  className,
  time,
  day,
  close,
  cellDetails,
  setCellDetails,
}) => {
  const ref = useRef(null);

  const [schedule, setSchedule] = useContext(ScheduleContext);

  const [alert, setAlert] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [destinationTitle, setDestinationTitle] = useState(cellDetails.title);
  const destinationStartTime = cellDetails.edit ? cellDetails.startTime : time;
  const [destinationDuration, setDestinationDuration] = useState(
    cellDetails.duration
  );
  const [destinationPlatform, setDestinationPlatform] = useState(
    cellDetails.platform
  );
  const [destinationLink, setDestinationLink] = useState(cellDetails.code);
  const [destinationDays, setDestinationDays] = useState([]);

  useEffect(() => {
    if (cellDetails.edit) setDestinationDays(cellDetails.days);
    else setDestinationDays([day]);
  }, []);

  useEffect(() => {
    const currStartTime = destinationStartTime;
    const currEndTime = destinationStartTime + destinationDuration;
    const currScheduleCode = cellDetails.schedulecode;

    for (let destination of schedule) {
      for (let day of destinationDays) {
        if (!destination.days.includes(day)) continue;
        else {
          let startTime = destination.startTime;
          let endTime = startTime + destination.duration;
          if (
            ((currStartTime >= startTime && currStartTime < endTime) ||
              (currEndTime > startTime && currEndTime <= endTime)) &&
            !(cellDetails.edit && currScheduleCode === destination.schedulecode)
          ) {
            setAlert(3);
            setAlertMessage(
              "Your destination has a clash with " +
                destination.title +
                " on " +
                day.charAt(0).toUpperCase() +
                day.slice(1) +
                ": [" +
                startTime +
                ":00 - " +
                endTime +
                ":00]"
            );
            return;
          }
        }
      }
    }

    if (destinationTitle === "") {
      setAlert(2);
      setAlertMessage("Enter a destination title");
      return;
    }

    if (!destinationPlatform) {
      setAlert(2);
      setAlertMessage("Select your any destination platform");
      return;
    }

    if (!destinationLink.length) {
      setAlert(2);
      setAlertMessage("Enter your destination link");
      return;
    }

    if (!validator.isURL(destinationLink)) {
      //if platform is google then check for letters only without '-' => link.trim().split("-").join().length === 7
      setAlert(3);
      setAlertMessage("You have entered an incorrect link!");
      return;
    }

    if (!destinationDays.length) {
      if (cellDetails.edit) {
        setAlert(4);
        setAlertMessage("Do you wish to delete it?");
      } else {
        setAlert(3);
        setAlertMessage("You haven't selected any day!");
      }
      return;
    }

    setAlert(1);
  }, [
    destinationTitle,
    destinationStartTime,
    destinationDuration,
    destinationPlatform,
    destinationLink,
    destinationDays,
    schedule,
  ]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, close]);

  const handleClose = () => {
    setAlert(0);
    setAlertMessage("");
    setDestinationTitle("");
    setDestinationDuration(1);
    setDestinationPlatform("");
    setDestinationLink("");
    setDestinationDays([]);
    setCellDetails(INITIAL_CELL_DETAILS);
    close(false);
  };

  const handleDelete = () => {
    var newSchedule = schedule;
    for (var i in newSchedule) {
      if (newSchedule[i].schedulecode === cellDetails.schedulecode) {
        newSchedule.splice(i, 1);
      }
    }
    setSchedule(newSchedule);
    handleClose();
  };

  const handleSubmitOrEdit = () => {
    var newSchedule = schedule;
    if (cellDetails.edit) {
      for (var i in newSchedule) {
        if (newSchedule[i].schedulecode === cellDetails.schedulecode) {
          newSchedule[i].title = destinationTitle.trim();
          newSchedule[i].duration = destinationDuration;
          newSchedule[i].platform = destinationPlatform;
          newSchedule[i].code = addProtocol(destinationLink);
          newSchedule[i].days = destinationDays.sort();
        }
      }
    } else {
      newSchedule.push({
        schedulecode: schedule.length,
        title: destinationTitle.trim(),
        startTime: destinationStartTime,
        duration: destinationDuration,
        platform: destinationPlatform,
        code: addProtocol(destinationLink),
        days: destinationDays.sort(),
      });
    }
    setSchedule(newSchedule);
    handleClose();
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
                  <h2 className="headline-4 mb-0 ml-3">Add Destination</h2>
                </div>
                <div className="headline-4 pointer" onClick={handleClose}>
                  <Image src={cross} width="10px" className="mr-2" />
                </div>
              </div>
            </Col>
          </Row>
          <Container className="px-2 px-md-4 py-3">
            <Row className="mt-2 align-items-center">
              <Col xs={2} className="d-flex align-items-center">
                <Image src={title} width="20px" />
              </Col>
              <Col xs={10} className="d-flex align-items-center px-0">
                <input
                  type="text"
                  className="headline-7 inputtext"
                  placeholder="Add Title"
                  value={destinationTitle}
                  onChange={(e) => setDestinationTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-4 align-items-center">
              <Col xs={2} className="d-flex align-items-center">
                <Image src={clock} width="20px" />
              </Col>
              <Col
                xs={10}
                className="d-flex align-items-center headline-7 px-0"
              >
                {destinationStartTime}:00 -{" "}
                {destinationStartTime + destinationDuration}:00
                <div className="ml-2 d-flex flex-column justify-content-between">
                  <Image
                    src={up}
                    width="8px"
                    className="mb-1 pointer"
                    onClick={() =>
                      setDestinationDuration(
                        destinationStartTime + destinationDuration === 21
                          ? destinationDuration
                          : destinationDuration + 1
                      )
                    }
                  />
                  <Image
                    src={down}
                    width="8px"
                    className="mt-1 pointer"
                    onClick={() =>
                      setDestinationDuration(
                        destinationDuration === 1
                          ? destinationDuration
                          : destinationDuration - 1
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-4 align-items-center">
              <Col xs={2} className="d-flex align-items-center">
                <Image src={platform} width="20px" />
              </Col>
              <Col xs={10} className="d-flex flex-wrap px-0">
                <div className="pl-4 d-flex align-items-center">
                  <input
                    type="radio"
                    id="gmeet"
                    value="gmeet"
                    name="platform"
                    checked={destinationPlatform === "gmeet"}
                    className="form-check-input scale-75"
                    onChange={(e) => setDestinationPlatform(e.target.value)}
                  />
                  <label htmlFor="gmeet" className="mb-0">
                    <Image src={meetlogo} width="35px" className="m-2" />
                  </label>
                </div>
                <div className="pl-4 d-flex align-items-center">
                  <input
                    type="radio"
                    id="zoom"
                    value="zoom"
                    name="platform"
                    checked={destinationPlatform === "zoom"}
                    className="form-check-input scale-75"
                    onChange={(e) => setDestinationPlatform(e.target.value)}
                  />
                  <label htmlFor="zoom" className="mb-0">
                    <Image src={zoomlogo} width="40px" className="m-2" />
                  </label>
                </div>
                <div className="pl-4 d-flex align-items-center">
                  <input
                    type="radio"
                    id="webex"
                    value="webex"
                    name="platform"
                    checked={destinationPlatform === "webex"}
                    className="form-check-input scale-75"
                    onChange={(e) => setDestinationPlatform(e.target.value)}
                  />
                  <label htmlFor="webex" className="mb-0">
                    <Image src={webexlogo} width="35px" className="m-2" />
                  </label>
                </div>
                <div className="pl-4 d-flex align-items-center">
                  <input
                    type="radio"
                    id="other"
                    value="other"
                    name="platform"
                    checked={destinationPlatform === "other"}
                    className="form-check-input scale-75"
                    onChange={(e) => setDestinationPlatform(e.target.value)}
                  />
                  <label htmlFor="other" className="headline-2 m-2">
                    Other
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="mt-4 align-items-center">
              <Col xs={2} className="d-flex align-items-center">
                <Image src={link} width="20px" />
              </Col>
              <Col
                xs={10}
                className="d-flex flex-column flex-md-row align-items-md-center px-0"
              >
                <input
                  type="text"
                  className="code form-control w-75"
                  value={destinationLink}
                  onChange={(e) => setDestinationLink(e.target.value)}
                  placeholder={
                    "Meet Link" +
                    (destinationPlatform === "gmeet"
                      ? ", Ex: meet.google.com/abc-def-ghi"
                      : destinationPlatform === "zoom"
                      ? ", Ex: org.zoom.us/j/98765432100"
                      : destinationPlatform === "webex"
                      ? ", Ex: org.webex.com/abcdef/onstage/g.php"
                      : " (or any other link to redirect)")
                  }
                />
              </Col>
            </Row>
            <Row className="mt-4 align-items-center">
              <Col xs={2} className="d-flex align-items-center">
                <Image src={repeat} width="20px" />
              </Col>
              <Col xs={10} className="d-flex flex-wrap align-items-center">
                {SCHEDULERS.map((scheduler) => {
                  var short = scheduler.substring(0, scheduler.length - 3);
                  if (short === "wednes") short = "wed";
                  short = short.charAt(0).toUpperCase() + short.slice(1);
                  return (
                    <div
                      className="mr-6 my-1 d-flex align-items-center"
                      key={scheduler}
                    >
                      <input
                        type="checkbox"
                        id={scheduler}
                        name="day"
                        value={scheduler}
                        className="form-check-input scale-75"
                        checked={destinationDays?.includes(scheduler)}
                        onChange={() => {
                          destinationDays?.includes(scheduler)
                            ? setDestinationDays(
                                destinationDays.filter(
                                  (day) => day !== scheduler
                                )
                              )
                            : setDestinationDays([
                                ...destinationDays,
                                scheduler,
                              ]);
                        }}
                      />
                      <label
                        htmlFor={scheduler}
                        className="day"
                        style={{ color: "var(--" + scheduler + ")" }}
                      >
                        {short}
                      </label>
                    </div>
                  );
                })}
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-4">
                {alert === 1 && (
                  <Alert variant="primary">
                    All good, no clashes yet. Click on Add to save once done!
                  </Alert>
                )}
                {alert === 2 && <Alert variant="warning">{alertMessage}</Alert>}
                {(alert === 3 || alert === 4) && (
                  <Alert variant="danger">{alertMessage}</Alert>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-3 d-flex justify-content-end">
                {alert !== 4 && (
                  <Button
                    variant="primary"
                    onClick={handleSubmitOrEdit}
                    disabled={alert !== 1}
                  >
                    {cellDetails.edit ? "Edit" : "Add"}
                  </Button>
                )}
                {alert === 4 && (
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDestination;
