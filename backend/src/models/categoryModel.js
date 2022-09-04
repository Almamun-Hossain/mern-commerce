const mongoose = require("mongoose");
const slugify = require("slugify");
const Category = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "MediaFile",
      default: null,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: function genSlug() {
        return slugify(this.name.toLowerCase());
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      res: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", Category);
