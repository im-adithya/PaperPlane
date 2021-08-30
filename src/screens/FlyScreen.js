import React, { useContext, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { PROPER_SCHEDULERS } from "../constants/properSchedulers";

import flyingplane from "../assets/flying-plane.svg";
import { AuthContext } from "../Auth";

const FlyScreen = () => {
  const history = useHistory();
  const flyDestination = useContext(AuthContext).flyDestination;

  useEffect(() => {
    if (flyDestination) window.location.href = flyDestination.code;
    else history.push("/home", { from: "/fly" });
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Image
        src={flyingplane}
        className="py-5 mx-auto d-block"
        width="30%"
        fluid
      />
      <div className="headline-2 text-center">
        Please wait... You are being redirected to:{" "}
        <span
          style={{
            color: "var(--" + PROPER_SCHEDULERS[new Date().getDay()] + ")",
            fontWeight: "bold",
          }}
        >
          {flyDestination ? flyDestination.title : "Home"}
        </span>
      </div>
    </div>
  );
};

export default FlyScreen;
