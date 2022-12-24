const handleAsyncError = require("../middleware/handleAsyncError");
const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const { upload } = require("../utils/mediaHelper");

/**
 *Get all category
 *Auth to all user
 */
exports.getAllCategory = handleAsyncError(async (req, res, next) => {
  const categories = await Category.find({});
  if (!categories)
    return next(new ErrorHandler("You don't have any category", 404));
  res.status(200).json({ success: true, categories });
});

/**
 * Insert new category
 * Auth to admin only
 */
exports.insertCategory = handleAsyncError(async (req, res, next) => {
  const file = req.file;
  const thumb = {
    filename: file.filename,
    path: file.path,
    size: file.size
  }
  const category = await Category.create({ user: req.user.id, thumb, ...req.body });
  res.status(200).json({ success: true, category });
});

/**
 * Get single category details
 * auth to all user
 */

exports.getSingleCategory = handleAsyncError(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);
  if (!category) return next(new ErrorHandler("Category not found.", 404));
  res.status(200).json({ success: true, category });
});

/**
 * Update category
 * Auth to admin only
 */

exports.updateCategory = handleAsyncError(async (req, res, next) => {
  const { categoryId } = req.params;

  let category = await Category.findById(categoryId);
  if (!category) return next(new ErrorHandler("Category not found", 404));
  category = await Category.findByIdAndUpdate(categoryId, req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  res.status(200).json({ success: true, category });
});


/**
 * Delete a category
 * Auth to Admin only
 */

exports.deleteCategory = handleAsyncError(async (req, res, next) => {
  let category = await Category.findById(req.params.categoryId);
  if (!category) return next(new ErrorHandler("Category not found.", 404));
  await category.remove();
  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully" });
})






/**
 * Test Category creation with files
*/

exports.testCategory = handleAsyncError(async (req, res, next) => {
  let { name } = req.body;

  const file = req.file;
  const thumb = {
    filename: file.filename,
    path: file.path,
    size: file.size
  }
  const category = await Category.create({ user: req.user.id, thumb, ...req.body });

  res.status(200).json({ category })
})