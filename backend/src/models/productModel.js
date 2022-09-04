const mongoose = require("mongoose");
const slugify = require("slugify");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
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
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLenght: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock number"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      }, {timestamps: true },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
