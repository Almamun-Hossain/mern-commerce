const handleAsyncError = require("../middleware/handleAsyncError");
const AddressBook = require("../models/addressBookModel");
const ErrorHandler = require("../utils/errorHandler");

/**
 * Get user all addresses
 */
exports.getAllShippingAddress = handleAsyncError(async (req, res, next) => {
  const addresses = await AddressBook.find({ user: req.user.id });
  res.status(200).json({ success: true, addresses });
});

/**
 * Add new address
 */
exports.insertShippingAddress = handleAsyncError(async (req, res, next) => {
  const address = await AddressBook.create({ user: req.user.id, ...req.body });
  res.status(200).json({ success: true, address });
});

/**
 * Get single address details
 */
exports.getDetailsShippingAddress = handleAsyncError(async (req, res, next) => {
  const address = await AddressBook.findById(req.params.addressId);
  if (!address) return next(new ErrorHandler("Address not found.", 404));
  res.status(200).json({ success: true, address });
});

exports.updateShippingAddress = handleAsyncError(async (req, res, next) => {
  let address = await AddressBook.findById(req.params.addressId);
  if (!address) return next(new ErrorHandler("Address not found.", 404));
  address = await AddressBook.findByIdAndUpdate(
    req.params.addressId,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ success: true, address });
});
exports.deleteShippingAddress = handleAsyncError(async (req, res, next) => {
  let address = await AddressBook.findById(req.params.addressId);
  if (!address) return next(new ErrorHandler("Address not found.", 404));
  await address.remove();
  res
    .status(200)
    .json({ success: true, message: "Address deleted successfully" });
});
