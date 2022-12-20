import React from "react";
import "./CartCard.css";
import { Button, Card } from "react-bootstrap";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/reducers/features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartCard = ({ item }) => {
  let { id, name, price, stock, quantity } = item;
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-middle h-25">
            <div className="product-image centering-middle">
              <img
                src="images/item-1.jpg"
                className="img-fluid"
                style={{ width: "100px" }}
                alt="cart product"
              />
            </div>
            <div className="product-title centering-middle">
              <h5 className="align-middle">
                <Link to={`/product/${id}`} className="text-decoration-none ">
                  {name.substring(0, 20)} ...
                </Link>
              </h5>
            </div>
            <div className="product-quantity w-50 centering-middle">
              <div className="d-flex justify-content-between">
                <Button
                  size="sm"
                  variant="light"
                  className="minus"
                  onClick={() => dispatch(decreaseQuantity(item))}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <span className="quantity-number">{quantity}</span>
                <Button
                  size="sm"
                  variant="light"
                  className="plus"
                  onClick={() => dispatch(increaseQuantity(item))}
                  disabled={stock <= quantity ? true : false}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </div>
            <div className="product-price centering-middle">
              <span>$ {price * quantity}</span>
            </div>
            <div className="remove-product centering-middle">
              <Button
                size="sm"
                variant="danger"
                onClick={() => dispatch(removeFromCart(item))}
              >
                Remove
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartCard;
