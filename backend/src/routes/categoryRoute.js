const express = require("express");
const { getAllCategory, insertCategory, getSingleCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const {
  isAuthenticatedUser,
  authToAdmin,
} = require("../middleware/authentication");

const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(isAuthenticatedUser, authToAdmin, insertCategory)

router
  .route('/:categoryId')
  .get(getSingleCategory)
  .put(isAuthenticatedUser, authToAdmin, updateCategory)
  .delete(isAuthenticatedUser, authToAdmin, deleteCategory);

module.exports = router;

