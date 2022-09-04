import { combineReducers } from "redux";
import userAuthSlice from "./features/auth/userAuthSlice";
import userRegisterSlice from "./features/auth/userRegisterSlice";
import productDetailsSlice from "./features/products/productDetailsSlice";
import productSlice from "./features/products/productSlice";

export default combineReducers({
  products: productSlice,
  productDetails: productDetailsSlice,
  //userAuth: userAuthSlice,
  userRegister: userRegisterSlice,
  [userAuthSlice.reducerPath]: userAuthSlice.reducer,
});
