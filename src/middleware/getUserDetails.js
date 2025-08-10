const { extractToken } = require("../utils");
const { verifyToken } = require("../actions/authActions");
// Function to get user details using the token
const getUserDetails = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const data = await verifyToken(token);
    req.user = data;
    next();
  } catch (error) {
    res
      .status(error?.status || 400)
      .json({ error: error?.response?.statusText || error.message });
  }
};

module.exports = { getUserDetails };
