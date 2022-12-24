const multer = require("multer");
const MediaFile = require("../models/MediaFileModel");
const fs = require("fs");
const path = require("path");

/**
 * Seting the disk storage configuration
 * its mean where to save the file
 * custom file name
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/media/");
  },
  filename: function (req, file, cb) {
    //writing custom file name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var ext = getFileExtension(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

/**
 * Filters the file extension
 * its return true and false
 * if the codition fulfiled
 */
const uploadFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files"), false);
  }
  cb(null, true);
};

//get the file extension from the filename
const getFileExtension = (name) => {
  return path.extname(name).slice(1);
};

//multer store the file to desire location as you set on configuration
exports.upload = multer({ storage, fileFilter: uploadFilter });
