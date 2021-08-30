import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CopyLink = () => {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  return (
    <div className="copylinkwrap mt-3 d-flex justify-content-between align-items-center px-3 noselect">
      <div className="copylink">
        <span className="copyheadline mr-2 d-none d-sm-inline">
          Paper Plane Link:
        </span>
        paper-planeee.web.app/fly
      </div>
      <div className="d-flex">
        <div
          className="copybtn pointer mr-2"
          onClick={() => {
            navigator.clipboard.writeText("https://paper-planeee.web.app/fly");
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 3000);
          }}
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
      <div
        className={
          "position-absolute rounded start-50 px-3 py-1 zindex10 translate-middle-x aftercopy " +
          (copied ? "copied" : "")
        }
      >
        Copied to clipboard
      </div>
    </div>
  );
};

export default CopyLink;
