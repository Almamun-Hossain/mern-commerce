import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../../utils/axiosErrorHandler";

const API_END_POINT = "http://localhost:4040/api/v1/product/";

//load carts product details
export const loadCarts = createAsyncThunk("user/loadCarts", async (carts) => {
  try {
    let update = [];
    await carts.map(async (item) => {
      let { data } = await axios.get(API_END_POINT + item.id);
      update.push({ ...item, product: data.product });
    });
    return { success: true, update };
  } catch (error) {
    return axiosErrorHandler(error);
  }
});

/**
 * Check if there are any items exist on local storage
 * @returns if true return the array object else empty array
 */
const checkCart = () => {
  let storage = localStorage.getItem("cart");
  if (!storage) {
    localStorage.setItem("cart", JSON.stringify([]));
  } else {
    return JSON.parse(localStorage.getItem("cart"));
  }
};

/**
 * Creating the cart slice as its a reducer
 * its includding name, state, action and extra reducers
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    carts: checkCart(),
    error: null,
    message: null,
  },
  reducers: {
    /**
     * this add to cart action
     * which will add a item to the cart list
     * */
    addToCarts: (state, action) => {
      //check if the carts null
      if (!state.carts) {
        state.carts = action.payload;
      } else {
        //checking prouduct already in cart or not
        const existItem = state.carts.find(
          (product) => product.id === action.payload.id
        );

        //if product exist into the cart
        if (existItem) {
          console.log("existItem");
          //loop through the all item to find the targeted proudct
          let update = state.carts.map((item) => {
            /**when product found and the stock is less than the exist cart quantity
             * then increase the product quantity with the passed quantity
             * else if product not found just return the exist item without modifying
             */
            if (
              item.id === action.payload.id &&
              action.payload.stock > item.quantity
            ) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            } else {
              return item;
            }
          });
          state.carts = update;
        } else {
          state.carts = [...state.carts, action.payload];
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
    /**
     * this is remove from cart list
     */
    removeFromCart: (state, action) => {
      //checking prouduct already in cart or not
      const existItem = state.carts.find(
        (product) => product.id === action.payload.id
      );

      /**
       * Check if the cart quantity one
       * then remove the product from the cart
       */
      if (existItem.quantity >= 1) {
        state.carts = state.carts.filter(
          (item) => item.id !== action.payload.id
        );
      }
      /**
       * And finally update the localstorage value
       */
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
    /**
     * increase the cart item quantity
     * item will increase until the stock is greater than quanity
     * @param {*} state
     * @param {*} action
     */
    increaseQuantity: (state, action) => {
      //checking prouduct already in cart or not
      const existItem = state.carts.find(
        (product) => product.id === action.payload.id
      );

      /**
       * Check if the cart quantity greater than one
       * then remove the product from the cart
       */
      if (existItem.quantity >= 1) {
        /**
         * Else if the cart quantity is more than one
         * then map through the array and uopdate the item quantity
         */
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      /**
       * And finally update the localstorage value
       */
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
    /**
     * decrease the cart item quantity
     * if the quantity is less than or equal 0
     * the item will remove completly
     * @param {*} state
     * @param {*} action
     */
    decreaseQuantity: (state, action) => {
      //checking prouduct already in cart or not
      const existItem = state.carts.find(
        (product) => product.id === action.payload.id
      );

      /**
       * Check if the cart quantity one
       * then remove the product from the cart
       */
      if (existItem.quantity === 1) {
        state.carts = state.carts.filter(
          (item) => item.id !== action.payload.id
        );
      }

      /**
       * Else if the cart quantity is more than one
       * then map through the array and uopdate the item quantity
       */
      state.carts = state.carts.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      /**
       * And finally update the localstorage value
       */
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCarts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loadCarts.fulfilled, (state, action) => {
      console.log("fulfiled");
      state = { ...state, isLoading: false };
      // //state.isLoading = false;
      // let update = action.payload.update;
      // console.log(typeof update);
      // state.isLoading = false;
      // state.carts = [...state.carts, { update }];
      // //localStorage.setItem("cart", JSON.stringify(state.carts));
    });
    builder.addCase(loadCarts.rejected, (state, action) => {
      state.isLoading = false;
      state.message = null;
      state.error = "Operatin failed with unknown error";
    });
  },
});

//Export all cart state
export const cartState = (state) => state.cart;

//export actions
export const {
  addToCarts,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

//export reducer
export default cartSlice.reducer;
