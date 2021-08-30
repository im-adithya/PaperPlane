import firebase from "../firebase";

const db = (uid) => {
  return firebase.database().ref("user-schedule/" + uid + "/schedule/");
};

const get = (uid) => {
  var schedule;
  firebase
    .database()
    .ref("user-schedule/" + uid + "/schedule/")
    .on("value", (snapshot) => {
      schedule = snapshot.val().schedule;
    });
  return schedule;
};

const create = (uid, data) => {
  return db(uid).push(data);
};

const update = (uid, key, data) => {
  return db(uid).child(key).update(data);
};

const remove = (uid, key) => {
  return db(uid).child(key).remove();
};

export default {
  get,
  create,
  update,
  remove,
};
