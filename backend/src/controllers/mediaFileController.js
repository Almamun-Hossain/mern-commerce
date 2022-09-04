const handleAsyncError = require("../middleware/handleAsyncError");
const MediaFile = require("../models/MediaFileModel");
const ErrorHandler = require("../utils/errorHandler");

const { upload } = require("../utils/mediaHelper");

exports.getAllMediaFiles = handleAsyncError(async (req, res, next) => {
  const mediaFiles = await MediaFile.find({});
  if (!mediaFiles) return next(new ErrorHandler("No midea files found", 404));
  return res.status(200).json({ success: true, mediaFiles });
});

exports.insertMediaFile = handleAsyncError(async (req, res, next) => {});
