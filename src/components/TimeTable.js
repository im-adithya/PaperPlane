import React, { useState, useContext } from "react";
import { AuthContext } from "../Auth";
import { INITIAL_CELL_DETAILS } from "../constants/initCellDetails";
import { SCHEDULERS } from "../constants/schedulers";
import { TIME_HEADERS } from "../constants/timeHeaders";
import { TIMES } from "../constants/times";

import AddDestination from "./AddDestination";
import MeetingCell from "./MeetingCell";

import add from "../assets/add.svg";

const TimeTable = () => {
  const [dest, setDest] = useState(false);
  const [row, setRow] = useState();
  const [col, setCol] = useState();
  const [cellDetails, setCellDetails] = useState(INITIAL_CELL_DETAILS);
  const schedule = useContext(AuthContext).schedule;
  const CellWrapper = ({ children }) => {
    return <div className="cellwrapper">{children}</div>;
  };

  const TableWrapper = ({ children }) => {
    return <div className="tablewrapper">{children}</div>;
  };

  const Cell = ({ child, heading, time, rId, cId, className }) => {
    return (
      <div
        className={
          className +
          " cell " +
          (heading ? "heading-cell " : "") +
          (time ? "time-cell " : "") +
          " table-row-" +
          rId +
          "-col-" +
          cId
        }
        onClick={() => {
          if (rId > 0 && cId > 0 && !child) {
            setRow(rId);
            setCol(cId);
            setDest(!dest);
          }
        }}
      >
        {child && child}
        {!(child || heading || time) && (
          <img src={add} className="background-add" width="30px" />
        )}
        {heading && <div className="column-header-text">{heading}</div>}
        {time && <div className="row-header-text">{time}</div>}
      </div>
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <TableWrapper>
        <CellWrapper>
          {TIME_HEADERS.map((elem, idx) => {
            const propsobj = {};
            if (elem === "Time") {
              propsobj.heading = "Time";
            } else {
              propsobj.time = elem;
            }
            return <Cell key={idx} {...propsobj} rId={idx} cId={0} />;
          })}
        </CellWrapper>
        <div className="tablewrapper scrollable">
          {SCHEDULERS.map((elem, idx) => {
            return (
              <CellWrapper key={idx}>
                <Cell
                  heading={elem.charAt(0).toUpperCase() + elem.slice(1)}
                  rId={0}
                  cId={idx + 1}
                />
                {[...Array(TIME_HEADERS.length - 1).keys()].map((ele, i) => {
                  const propsobj = {};
                  for (let destination of schedule) {
                    if (!destination.days.includes(elem)) continue;
                    else {
                      if (destination.startTime === TIMES[ele])
                        propsobj.child = (
                          <MeetingCell
                            day={elem}
                            close={setDest}
                            open={dest}
                            cellDetails={destination}
                            setCellDetails={setCellDetails}
                          />
                        );
                      else {
                        if (
                          destination.startTime < TIMES[ele] &&
                          destination.startTime + destination.duration >
                            TIMES[ele]
                        )
                          propsobj.child = (
                            <MeetingCell
                              day={elem}
                              close={setDest}
                              open={dest}
                              cellDetails={destination}
                              setCellDetails={setCellDetails}
                              extension
                            />
                          );
                      }
                    }
                  }
                  return (
                    <Cell
                      className="pointer"
                      rId={ele + 1}
                      cId={idx + 1}
                      key={i}
                      {...propsobj}
                    />
                  );
                })}
              </CellWrapper>
            );
          })}
        </div>
      </TableWrapper>
      {dest && (
        <AddDestination
          time={TIMES[row - 1]}
          day={SCHEDULERS[col - 1]}
          close={setDest}
          cellDetails={cellDetails}
          setCellDetails={setCellDetails}
        />
      )}
    </div>
  );
};

export default TimeTable;
