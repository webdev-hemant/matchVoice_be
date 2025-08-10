const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config/allEnv");
const allServices = require("../services/instances");

exports.getAllUsers = async (token) => {
  const { data } = await allServices.authService.get("/api/getAllUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

exports.registerUser = async (body) => {
  const { data } = await allServices.authService.post(
    "/api/register",
    body
  );
  return data;
};

exports.loginUser = async (body) => {
  const { data } = await allServices.authService.post("/api/login", body);
  return data;
};

exports.verifyToken = async (token) => {
  const { data } = await allServices.authService.get(
    "/api/getUserDetails",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

exports.generateAdminToken = async () => {
  const body = {
    usernameOrEmail: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  };
  const response = await allServices.authService.post("/api/login", body);
  const token = response?.data?.token;
  return token;
};

exports.getUsersByIds = async (ids) => {
  const { data } = await allServices.authService.post(
    "/api/getUsersByIds",
    { ids }
  );
  return data;
};

exports.sendOtpForLogin = async (body) => {
  const { data } = await allServices.authService.post("/api/sendOtpForLogin", body);
  return data;
};

exports.verifyOtpForLogin = async (body) => {
  const { data } = await allServices.authService.post("/api/verifyOtpForLogin", body);
  return data;
};