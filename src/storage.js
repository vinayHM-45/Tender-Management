export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doLogin = (user, next) => {
  localStorage.setItem("data", JSON.stringify({ user }));
  next();
};

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data"))?.user;
  } else {
    return undefined;
  }
};
