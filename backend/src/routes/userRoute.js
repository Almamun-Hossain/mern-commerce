const express = require("express");
const {
  getAllUser,
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getSignleUserDetails,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authToAdmin,
  authToRegularUser,
} = require("../middleware/authentication");
const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(logOut);
router.route("/user/password/forgot").post(forgotPassword);
router.route("/user/password/reset/:token").put(resetPassword);
router.route("/user/me").get(isAuthenticatedUser, getUserDetails);
router.route("/user/password/update").put(isAuthenticatedUser, authToRegularUser, updatePassword);
router.route("/admin/users").get(isAuthenticatedUser, authToAdmin, getAllUser);
router
  .route("admin/user/:userId")
  .get(isAuthenticatedUser, authToAdmin, getSignleUserDetails)
  .put(isAuthenticatedUser, authToAdmin, updateUserRole)
  .delete(isAuthenticatedUser, authToAdmin, deleteUser);

module.exports = router;
