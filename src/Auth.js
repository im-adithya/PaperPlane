import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import firebase from "./firebase.js";

import { fly } from "./actions/paperplane";
import { upcoming } from "./actions/upcoming";
import loader from "./assets/loader.svg";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const today = new Date();

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [unEdited, setUnEdited] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [helper, setHelper] = useState(false);
  const [flyDestination, setFlyDestination] = useState({});
  const [existingUser, setExistingUser] = useState(false);
  const [scheduleLoading, setscheduleLoading] = useState(true);

  useEffect(async () => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      firebase
        .database()
        .ref("user-schedule/" + user?.uid)
        .on("value", (snapshot) => {
          if (snapshot.val()) setExistingUser(true);
          setSchedule(snapshot.val() ? snapshot.val().schedule : []);
          setUnEdited(snapshot.val() ? snapshot.val().schedule : []);
          setUpComing(
            upcoming(snapshot.val() ? snapshot.val().schedule : [], today)
          );
          setFlyDestination(
            fly(snapshot.val() ? snapshot.val().schedule : [], today)
          );
          setscheduleLoading(false);
        });
      setPending(false);
    });
  }, []);

  if (pending || scheduleLoading) {
    return <Image src={loader} width="50px" className="d-block mx-auto mt-5" />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        schedule,
        unEdited,
        existingUser,
        upComing,
        flyDestination,
        helper: { helper, setHelper },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
