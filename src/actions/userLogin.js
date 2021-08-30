import firebase from "../firebase";

export const userLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // if first time take him to welcome, set your schedule first screen
      if (result.additionalUserInfo.isNewUser) window.location = "/schedule";
      else window.location = "/home";
    })
    .catch((error) => {
      console.log(error);
    });
};
