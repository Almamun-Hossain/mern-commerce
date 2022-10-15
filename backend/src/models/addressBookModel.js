const mongoose = require("mongoose");

const AddressBook = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input receiver name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please input your phone number"],
    trim: true,
  },
  secondaryPhone: {
    type: String,
    required: false,
    default: null,
    trim: true,
  },
  country: {
    type: Object,
    required: [true, "Please select your country"],
    trim: true,
  },
  state: {
    type: Object,
    required: false,
    default: null,
  },
  city: {
    type: Object,
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: [true, "Please input your address"],
  },
  zipcode: {
    type: String,
    required: [true, "Please input your zipcode"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("AddressBook", AddressBook);
