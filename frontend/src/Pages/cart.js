import React, { Fragment } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CartCard from "../Components/Cart/CartCard";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { cartState } from "../store/reducers/features/cart/cartSlice";
import {
  subTotalPrice,
  totalCartItem,
  totalPrice,
  totalTax,
} from "../store/reducers/features/cart/cartSelector";
import { Link } from "react-router-dom";
const Cart = () => {
  let state = useSelector((state) => state);
  let { carts } = useSelector(cartState);
  let totalItems = totalCartItem(state);
  let subTotalCartPrice = subTotalPrice(state);
  let tax = totalTax(state);
  let totalCheckoutPrice = totalPrice(state);
  console.log(tax);

  return (
    <Fragment>
      <Header />
      <Container>
        {carts.length <= 0 && <div className="w-50 mx-auto text-center py-5">
          <h1>You don't have any products in cart. <Link to="/" className="text-decoration-none text-primary">Go for Shopping</Link></h1>
        </div>}

        {carts.length > 0 && (
          <Fragment>
            <div className="card card-body card-header my-2">
              Total Cart Items: {totalItems}
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
              <Link to="/checkout" className="btn btn-secondary btn-lg">
                Checkout
              </Link>
            </div>
          </Fragment>
        )}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Cart;
