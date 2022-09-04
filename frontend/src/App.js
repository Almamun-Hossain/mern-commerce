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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;