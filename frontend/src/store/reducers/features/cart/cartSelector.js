import { createSelector } from "@reduxjs/toolkit";

/**
 * Get Carts item from state
 *
 */
export const cartsItem = (state) => state.cart.carts;

/**
 * Return the total carts item
 */

export const totalCartItem = createSelector(cartsItem, (items) => {
  //initial cart count is 0
  let total = 0;
  /**
   * if there are item then map the item and
   * get the each item quantity
   * and finally add the value with total quantity
   */
  if (items) {
    items.map((item) => {
      total += item.quantity;
    });
  }
  //return the total quantity
  return total;
});

/**
 * Counting total price of a cart products
 */
export const subTotalPrice = createSelector(cartsItem, (items) => {
  //Intial cart price is 0
  let total = 0;
  /**
   * if there are item then map the item and
   * get the each item price and quantity
   * multiply them and finally add the value with total price
   */
  if (items) {
    items.map((item) => {
      total += item.quantity * item.price;
    });
  }

  //return the total price
  return total;
});

export const totalTax = createSelector(
  subTotalPrice,
  (subTotal) => subTotal * (15 / 100)
);

export const totalPrice = createSelector(
  subTotalPrice,
  totalTax,
  (subtotal, tax) => subtotal + tax
);
