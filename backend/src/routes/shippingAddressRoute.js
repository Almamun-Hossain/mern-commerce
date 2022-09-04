const express = require("express");
const {
  getAllShippingAddress,
  insertShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getDetailsShippingAddress,
} = require("../controllers/addressBookController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticatedUser, getAllShippingAddress)
  .post(isAuthenticatedUser, insertShippingAddress);
router
  .route("/:addressId")
  .get(isAuthenticatedUser, getDetailsShippingAddress)
  .put(isAuthenticatedUser, updateShippingAddress)
  .delete(isAuthenticatedUser, deleteShippingAddress);

module.exports = router;
