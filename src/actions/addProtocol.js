export const addProtocol = (str) => {
  if (!str.match(/^[a-zA-Z]+:\/\//)) {
    str = "http://" + str;
  }
  return str;
};
