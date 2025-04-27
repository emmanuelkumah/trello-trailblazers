module.exports = {
  register: require("./register"),
  login: require("./login"),
  logout: require("./logout"),
  requestResetOTP: require("./requestPasswordResetOTP"),
  verifyResetOTP: require("./verifyPasswordResetOTP"),
  resetPassword: require("./resetPassword"),
};
