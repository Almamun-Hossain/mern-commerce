import React, { useState } from "react";
import "./ProductSummary.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, Image } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
const ProductSummary = ({ product }) => {
  let [quantity, setQuantity] = useState(1);

  const options = {
    edit: false,
    count: 5,
    isHalf: true,
    activeColor: "#ff4545",
    color: "#cccccc",
    value: product.ratings,
    size: 18,
  };

  let increaseQuantity = () => {
    setQuantity((quantity += 1));
  };
  let decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity -= 1));
    }
  };

  return (
    <div className="product-summary position-relative">
      <div className="product-head mb-3">
        <h2 className="product-title">{product.name || <Skeleton />}</h2>
      </div>
      {/* Price box start */}
      <div className="price-box mb-3">
        <span className="regular-price">${product.price}</span>
        {/* <span className="old-price">
          <del>$450</del>
        </span> */}
      </div>
      {/* Price box end */}

      {/* Star rating start */}
      <span className="ratings justify-content-start">
        <ReactStars {...options}></ReactStars>
        <span className="rating-num">( {product.reviews.length} )</span>
      </span>
      {/* Star rating end */}

      {/* Product Meta start */}
      <div className="product-meta mb-3">
        <div className="product-size">
          <span>Size: </span>
          <a href="/">S</a>
          <a href="/">M</a>
          <a href="/">L</a>
          <a href="/">XL</a>
          <a href="/">XXL</a>
        </div>
      </div>
      {/* Product Meta end */}

      {/* Product Color start */}
      <div className="product-color-variation">
        <span>Colors:</span>
        <div className="color-items">
          <Image
            src="/images/item-1.jpg"
            className="product-color-image"
            alt="color image"
          />
          <Image
            src="/images/item-1.jpg"
            className="product-color-image"
            alt="color image"
          />
          <Image
            src="/images/item-1.jpg"
            className="product-color-image"
            alt="color image"
          />
          <Image
            src="/images/item-1.jpg"
            className="product-color-image"
            alt="color image"
          />
        </div>
      </div>
      {/* Product Color end */}

      {/* Shopping Quantity start */}
      <div className="product-quantity">
        <div className="d-flex justify-content-between">
          <Button variant="light" className="minus" onClick={decreaseQuantity}>
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <span className="quantity-number">{quantity}</span>
          <Button variant="light" className="plus" onClick={increaseQuantity}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
      {/* Shopping quantity end */}

      {/* Product action button  */}

      <div className="product-action-buttons">
        <Button variant="outline-dark" className="btn-cart me-3" size="lg">
          Add to Cart
        </Button>
        <Button variant="outline-dark" className="btn-wish ms-3" size="lg">
          Add to Wishlist
        </Button>
      </div>

      {/* End of Product action button  */}
    </div>
  );
};

export default ProductSummary;
