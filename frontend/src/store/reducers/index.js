import { combineReducers } from "redux";
import userAuthSlice from "./features/auth/userAuthSlice";
import userResetPasswordSlice from "./features/auth/userResetPasswordSlice";
import cartSlice from "./features/cart/cartSlice";
import productDetailsSlice from "./features/products/productDetailsSlice";
import productSlice from "./features/products/productSlice";

export default combineReducers({
  products: productSlice,
  productDetails: productDetailsSlice,
  auth: userAuthSlice,
  resetPassword: userResetPasswordSlice,
  cart: cartSlice,
});
