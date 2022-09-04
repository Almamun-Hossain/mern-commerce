const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsyncError = require("../middleware/handleAsyncError");
const ApiFeature = require("../utils/apiFeature");

/**
 * Create product
 * Perform by Admin
 */
exports.createProduct = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Product added successfully!", product });
});

/**
 * Get All products
 * Perform by all users
 */
exports.getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({ success: true, products });
});

/**
 * Get Single Product Details
 * Access by all user
 * not authenticated
 */

exports.getProductDetails = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({ success: true, product });
});

/**
 * Update product
 * Perform by Admin
 */

exports.updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

/**
 * Delete product
 * Perform by Admin
 */
exports.deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  await product.deleteOne({ _id: req.params.productId });

  res
    .status(200)
    .json({ success: true, message: "Product delete successfully" });
});

/** Create Review
 * add condition if user ordered the product
 */
exports.createProductReview = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const newReview = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(req.params.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user.id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(newReview);
  }
  let avg = 0;

  product.reviews.forEach((element) => {
    avg += element.rating;
  });
  product.ratings = avg / product.reviews.length;
  product.numOfReviews = product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

/**
 * Get all review from a product
 */
exports.getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate("reviews.user");
  if (!product) return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({ success: true, reviews: product.reviews });
});

/**
 * Delete a user review
 */
exports.deleteReview = handleAsyncError(async (req, res, next) => {
  if (req.query.reviewId == null)
    return next(new ErrorHandler("Bad request", 400));

  //find the product
  const product = await Product.findById(req.params.productId);
  //check product exist or not
  if (!product) return next(new ErrorHandler("Product not found", 404));
  // check if this product has any review or not
  if (product.reviews.length <= 0)
    return next(new ErrorHandler("This product don't have any reviews", 404));

  //check the request review id is exit or not
  const reviewFound = product.reviews.find(
    (review) => review._id.toString() === req.query.reviewId.toString()
  );

  if (reviewFound) {
    // if review user and logged in user are same or not
    if (reviewFound.user.toString() !== req.user.id.toString())
      return next(
        new ErrorHandler("You are not authorize to delete this comment", 401)
      );
  } else {
    return next(new ErrorHandler("Review not found!", 404));
  }

  //remove the review
  product.reviews.id(req.query.reviewId).remove();

  //change the ratings
  let avg = 0;
  product.reviews.forEach((element) => {
    avg += element.rating;
  });
  product.ratings = avg / product.reviews.length;
  product.numOfReviews = product.reviews.length;

  //save the final product
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
