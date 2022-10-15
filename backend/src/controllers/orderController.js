const handleAsyncError = require("../middleware/handleAsyncError");
const Orders = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
/**
 * get all orders by user id
 */
exports.getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Orders.find({ user: req.user.id });
  if (!orders) return next(new ErrorHandler("You don't have any order", 404));
  res.status(200).json({ success: true, orders });
});

/**
 * Create new order or place new order
 * Authorized by only logged in user
 */
exports.createOrder = handleAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discount,
    totalPrice,
  } = req.body;

  const order = await Orders.create({
    orderItems,
    shippingAddress,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discount,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({ success: true, order });
});

/**
 * Ger specific order details
 */
exports.getOrderDetails = handleAsyncError(async (req, res, next) => {
  const order = await Orders.findById(req.params.orderId);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  res.status(200).json({ success: true, order });
});

/**
 * Update order status details
 * Authorize to Admin only
 */
exports.updateOrderShippingStatus = handleAsyncError(async (req, res, next) => {
  const { status } = req.body;
  const order = await Orders.findById(req.params.orderId);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("The order has been delivered", 400));
  }
  if (status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.orderStatus = status;
  await order.save();
  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  res.status(200).json({ success: true, order });
});

/**
 *When a product has been shipped update the product stock
 * @param {objectId} id
 * @param {quantity number type} quantity
 */
const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  if (product.stock > quantity) {
    product.stock -= quantity;
  }
  await product.save({ validateBeforeSave: false });
};

/**
 * Cancel a order
 */
exports.cancelOrder = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  if (order.orderStatus === "Shipped")
    return next(
      new ErrorHandler(
        "Your order has been shipped. Please wait until to deliver. Then appy for return.",
        201
      )
    );
  order.satus = "Cancel";
  await order.save();
  res.status(200).json({ success: true });
});

/**
 * Delete order
 * Perform by Admin
 */

exports.deleteOrder = handleAsyncError(async (req, res, next) => {
  const order = await Orders.findById(req.params.orderId);
  if (!order) return next(new ErrorHandler("Order not found!", 404));

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
