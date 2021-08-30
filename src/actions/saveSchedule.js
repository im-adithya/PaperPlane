import firebase from "../firebase";

export const saveSchedule = (schedule) => {
  firebase
    .database()
    .ref("user-schedule/" + firebase.auth().currentUser.uid)
    .set({ schedule });
};
