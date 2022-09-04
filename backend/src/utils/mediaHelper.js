const multer = require("multer");
const MediaFile = require("../models/MediaFileModel");
const fs = require("fs");
const path = require("path");
exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/media/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var ext = utils.getFileExtension(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const uploadFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files"), false);
  }
  cb(null, true);
};

exports.getFileExtension = (name) => {
  return path.extname(name).slice(1);
};

exports.upload = multer({ storage, fileFilter: uploadFilter });
