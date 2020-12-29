import axois from "axios";

export const register = (body) => {
  return axois.post("/api/register", body).then((res) => {
    // console.log(res.data);
    // console.log("Registered");
  });
};

export const login = (body) => {
  return axois.post("/api/login", body).then((res) => {
    sessionStorage.setItem("token", res.data.token);
    // console.log(res.data);
    // console.log("Logged in");
  });
};

export const isAuthorized = () => {
  return axois
    .get("/api/isauth", {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    })
    .then((res) => res.data);
};
