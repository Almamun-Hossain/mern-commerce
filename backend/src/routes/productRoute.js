const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/ProductController");
const {
  authToAdmin,
  isAuthenticatedUser,
  authToRegularUser,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authToAdmin, createProduct);
router
  .route("/product/:productId")
  .get(getProductDetails)
  .put(isAuthenticatedUser, authToAdmin, updateProduct)
  .delete(isAuthenticatedUser, authToAdmin, deleteProduct);

router
  .route("/product/:productId/review")
  .get(getProductReviews)
  .put(isAuthenticatedUser, authToRegularUser, createProductReview)
  .delete(isAuthenticatedUser, authToRegularUser, deleteReview);

module.exports = router;
