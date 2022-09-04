const express = require("express");
const {
  getAllOrders,
  createOrder,
  getOrderDetails,
  updateOrderShippingStatus,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  authToAdmin,
} = require("../middleware/authentication");
const router = express.Router();
router
  .route("/")
  .get(isAuthenticatedUser, getAllOrders)
  .post(isAuthenticatedUser, createOrder);
router
  .route("/:orderId")
  .get(isAuthenticatedUser, getOrderDetails)
  .put(isAuthenticatedUser, updateOrderShippingStatus)
  .delete(isAuthenticatedUser, authToAdmin, deleteOrder);
module.exports = router;
