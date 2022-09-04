const logger = require("morgan");
const express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");

const errorMiddleware = require("./src/middleware/error");

const app = express();

const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");
const addressRoute = require("./src/routes/shippingAddressRoute");
const orderRouter = require("./src/routes/orderRoute");
const categoryRoute = require("./src/routes/categoryRoute");

//preconfiguration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//router
app.use("/api/v1/", productRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/address/", addressRoute);
app.use("/api/v1/order", orderRouter);
app.use('/api/v1/category',categoryRoute)
//error handling
app.use(errorMiddleware);

module.exports = app;
