import { combineReducers } from "redux";
import userAuthSlice from "./features/auth/userAuthSlice";
import productDetailsSlice from "./features/products/productDetailsSlice";
import productSlice from "./features/products/productSlice";

export default combineReducers({
  products: productSlice,
  productDetails: productDetailsSlice,
  auth: userAuthSlice,
});
