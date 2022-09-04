const mongoose = require("mongoose");

const AddressBook = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input receiver name"],
  },
  phone: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: [true, "Please select your country"],
  },
  state: {
    type: String,
    required: [true, "Please choose your state"],
  },
  city: {
    type: String,
    required: [true, "Please select your city"],
  },
  address: {
    type: String,
    required: [true, "Please input your address"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("AddressBook", AddressBook);
