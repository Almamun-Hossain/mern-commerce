import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "./Pages/contact";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Cart from "./Pages/cart";
import ProductDetails from "./Pages/productDetails";
import ForgotPassword from "./Pages/forgot-password";
import { ErrorPage } from "./Pages/404";
import { ResetPassword } from "./Pages/reset-password";
import Account from "./Pages/account";

import store from "./store";
import { loadUser } from "./store/reducers/features/auth/userAuthSlice";
import Address from "./Pages/address";
import Orders from "./Pages/orders";
import ReturnRefund from "./Pages/return-refund";
import Reviews from "./Pages/reviews";
import Checkout from "./Pages/checkout";

store.dispatch(loadUser());

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:resetToken"
          element={<ResetPassword />}
        />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/user">
          <Route path="account" element={<Account />} />
          <Route path="addresses" element={<Address />} />
          <Route path="orders" element={<Orders />} />
          <Route path="returns-refund" element={<ReturnRefund />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
