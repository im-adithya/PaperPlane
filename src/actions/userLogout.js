import firebase from "../firebase";

export const userLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        // Sign-out successful.
      },
      function (error) {
        console.log(error);
      }
    );
};
