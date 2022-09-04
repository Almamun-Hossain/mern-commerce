const express = require("express");
const { getAllMediaFiles } = require("../controllers/mediaFileController");
const rotuer = express.Router();
router.route("/").get(getAllMediaFiles);
