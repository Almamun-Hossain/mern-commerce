import React, { Fragment } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CartCard from "../Components/Cart/CartCard";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { cartState } from "../store/reducers/features/cart/cartSlice";
import {
  subTotalPrice,
  totalCartItem,
  totalPrice,
  totalTax,
} from "../store/reducers/features/cart/cartSelector";
const Cart = () => {
  let state = useSelector((state) => state);
  let { carts } = useSelector(cartState);
  let totatItems = totalCartItem(state);
  let subTotalCartPrice = subTotalPrice(state);
  let tax = totalTax(state);
  let totalCheckoutPrice = totalPrice(state);
  console.log(tax);

  return (
    <Fragment>
      <Header />
      <Container>
        <div className="card card-body card-header my-2">
          Total Cart Items: {totatItems}
        </div>
        {carts &&
          carts.map((item) => {
            return <CartCard key={item.id} item={item} />;
          })}

        <div className="mb-2">
          <div className="row">
            <div className="col col-md-4">
              <div className="card card-body">
                <b>Subtotal: ${subTotalCartPrice}</b>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="card card-body">
                <b>Tax(15%): ${tax}</b>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="card card-body">
                <b>Total: ${totalCheckoutPrice}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="float-end my-2">
          <Button size="lg" variant="secondary">
            Checkout
          </Button>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Cart;
