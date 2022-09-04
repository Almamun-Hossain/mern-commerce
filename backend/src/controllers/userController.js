const handleAsyncError = require("../middleware/handleAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

/**
 * Get all user list
 * Access by only Admin User
 */
exports.getAllUser = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

/**
 * Get single user details
 * Access by only Amdin User
 */

exports.getSignleUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(res.params.userId);
  if (!user) return next(new ErrorHandler("User not found!", 404));
  res.status(200).json({ success: true, user });
});

/**
 * Update user role
 */

exports.updateUserRole = handleAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { name: req.body.role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true });
});

/**
 * Register an user
 */

exports.registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profile pic url",
    },
  });
  sendToken(user, 201, res);
});

/**
 * Login User
 */
exports.loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter email or password", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid email or password", 401));
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password", 401));

  sendToken(user, 200, res);
});

/**
 * Logout user
 */
exports.logOut = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully!" });
});

/**
 * Forgot password
 * send reset email
 */
exports.forgotPassword = handleAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User not found", 404));
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;
  const message = `Hi ${user.name}, \n\n You just requested for password reset. Your Password reset token is: \n\n ${resetURL}
  \n\n If you didn't request this email, please ignore it. \n\n\n Note: The reset token is valid for 15min.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password reset",
      message: message,
    });
    res
      .status(200)
      .json({ success: true, message: "Reset email sent successfully!!" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorHandler(error.message, 500));
  }
});

/**
 * Reset user password
 */
exports.resetPassword = handleAsyncError(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password does not match with confirm password", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

/**
 * Get user details
 */

exports.getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

/**
 * Update user password
 */
exports.updatePassword = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new ErrorHandler("Password doesn't match", 400));

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Incorrect old password", 400));

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

/**
 * Update user profile
 */
exports.updatePassword = handleAsyncError(async (req, res, next) => {
  const updateUserData = {
    name: req.body.name,
  };

  await User.findByIdAndUpdate(req.user.id, updateUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
