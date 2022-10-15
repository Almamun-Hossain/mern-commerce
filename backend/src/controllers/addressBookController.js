const handleAsyncError = require("../middleware/handleAsyncError");
const AddressBook = require("../models/addressBookModel");
const ErrorHandler = require("../utils/errorHandler");
const { processFormData } = require("../utils/processAddressData");

/**
 * Get user all addresses
 * and it's required authentications
 */
exports.getAllShippingAddress = handleAsyncError(async (req, res, next) => {
  /**
   * Find the all address data by user id
   * UserID will extract from the request
   */

  const addresses = await AddressBook.find({ user: req.user.id });

  /**
   * finally send the response
   * if there is no address found
   * the addresses will be an empty array
   */
  res.status(200).json({ success: true, addresses });
});

/**
 * Add new address for a user
 * and it's required authentication
 */
exports.insertShippingAddress = handleAsyncError(async (req, res, next) => {
  //process the data for country and state
  let processedData = processFormData(req.body);

  //insert the data to database
  const address = await AddressBook.create({
    user: req.user.id,
    ...processedData,
  });

  //finally send the response data
  res.status(200).json({ success: true, address });
});

/**
 * Get single address details
 * Required specific address ID
 * and it's required authentication
 */
exports.getDetailsShippingAddress = handleAsyncError(async (req, res, next) => {
  const address = await AddressBook.findById(req.params.addressId);
  if (!address) return next(new ErrorHandler("Address not found.", 404));
  res.status(200).json({ success: true, address });
});

/**
 * Update existig address
 * Required address id
 * and it's required authentication
 */
exports.updateShippingAddress = handleAsyncError(async (req, res, next) => {
  //Find the address from the database
  let address = await AddressBook.findById(req.params.addressId);

  //if address not found return a error message with status code 404
  if (!address) return next(new ErrorHandler("Address not found.", 404));

  /**
   * Then again send a update query to database
   * this method will find the the address by its id
   * and then it will update the record
   * and return the update data
   *
   * Here also re-assining the address data with update data
   */
  address = await AddressBook.findByIdAndUpdate(
    req.params.addressId,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  //and finally send response with update data
  res.status(200).json({ success: true, address });
});

/**
 * This method is to delete bussiness address
 * Need to pass the address id
 * and it's required authentication
 */
exports.deleteShippingAddress = handleAsyncError(async (req, res, next) => {
  //Find the address by it's id
  let address = await AddressBook.findById(req.params.addressId);

  /**
   * If address not found or return empty or null send the error response
   * with status code 404
   */

  if (!address) return next(new ErrorHandler("Address not found.", 404));

  //if found then just remove the data
  await address.remove();

  //finally send the response
  res
    .status(200)
    .json({ success: true, message: "Address deleted successfully" });
});
