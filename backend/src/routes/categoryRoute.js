const express = require("express");
const { getAllCategory, insertCategory, getSingleCategory, updateCategory, deleteCategory, testCategory } = require("../controllers/categoryController");
const {
  isAuthenticatedUser,
  authToAdmin,
} = require("../middleware/authentication");
const { upload } = require("../utils/mediaHelper");

const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(isAuthenticatedUser, authToAdmin, upload.single('thumb'), insertCategory)

router
  .route('/:categoryId')
  .get(getSingleCategory)
  .put(isAuthenticatedUser, authToAdmin, updateCategory)
  .delete(isAuthenticatedUser, authToAdmin, deleteCategory);


// router.route("/test").post(isAuthenticatedUser, authToAdmin, upload.single('thumb'), testCategory)

module.exports = router;

