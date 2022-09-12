const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsyncError = require("./handleAsyncError");

exports.isAuthenticatedUser = handleAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler("Please login to access this page", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authToAdmin = handleAsyncError(async (req, res, next) => {
  //console.log(req.user);
  if (!req.user.isAdmin)
    return next(new ErrorHandler("You are not authorize to access", 401));
  next();
});

exports.authToRegularUser = handleAsyncError(async (req, res, next) => {
  if (req.user.isAdmin) {
    return next(new ErrorHandler("You are not authorize to access", 401));
  }
  next();
});
