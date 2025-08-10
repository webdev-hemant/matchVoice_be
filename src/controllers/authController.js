const {
  getAllUsers,
  registerUser,
  loginUser,
  generateAdminToken,
  sendOtpForLogin,
  verifyOtpForLogin,
} = require("../actions/authActions");
const globalState = require("../utils/globalState");

exports.getAllUsers = async (req, res) => {
  try {
    const adminToken = globalState.get("adminToken");
    if (adminToken) {
      getAllUsers(adminToken)
        .then((resp) => {
          res.status(200).json({ total: resp.length, users: resp });
        })
        .catch(async (err) => {
          console.log({ err });
          const token = await generateAdminToken();
          globalState.set("adminToken", token);
          const users = await getAllUsers(token);
          res.status(200).json({ total: users.length, users: users });
        });
    } else {
      const token = await generateAdminToken();
      globalState.set("adminToken", token);
      const users = await getAllUsers(token);
      res.status(200).json({ total: users.length, users: users });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        error?.response?.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, birthdate, email } =
      req.body;

    const data = await registerUser({
      username,
      password,
      firstName,
      lastName,
      birthdate,
      email,
    });

    res.send(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        error?.response?.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};

exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const data = await loginUser({
      usernameOrEmail,
      password,
    });

    res.send(data);
  } catch (error) {
    console.error({ loginError: error.message });
    res
      .status(500)
      .json(
        error?.response?.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};

exports.getUserDetailsCntr = async (req, res) => {
  const userDetails = req.user;
  try {
    res.send(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sendOtpForLoginCntr = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    const data = await sendOtpForLogin({
      mobileNumber,
    });

    res.send(data);
  } catch (error) {
    console.error({ loginError: error.message });
    res
      .status(500)
      .json(
        error?.response?.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};

exports.verifyOtpForLoginCntr = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    const data = await verifyOtpForLogin({
      mobileNumber,
      otp
    });

    res.send(data);
  } catch (error) {
    console.error({ loginError: error.message });
    res
      .status(500)
      .json(
        error?.response?.data || {
          message: error.message || "Internal server error",
        }
      );
  }
};