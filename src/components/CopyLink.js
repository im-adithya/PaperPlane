import React from "react";
import { useHistory } from "react-router-dom";

const CopyLink = () => {
  const history = useHistory();
  return (
    <div className="copylinkwrap d-flex justify-content-between align-items-center px-3 noselect">
      <div className="copylink">
        <span className="copyheadline mr-2 d-none d-sm-inline">
          Paper Plane Link:
        </span>
        paper-planeee.web.app/fly
      </div>
      <div className="d-flex">
        <div
          className="copybtn pointer mr-2"
          onClick={() =>
            navigator.clipboard.writeText("https://paper-planeee.web.app/fly")
          }
        >
          Copy
        </div>
        <div
          className="gobtn pointer ml-2"
          onClick={() => history.push("/fly")}
        >
          Go
        </div>
      </div>
    </div>
  );
};

export default CopyLink;
