import React from "react";
import { Button, Card, CardImg, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCard.css";
const ProductCard = (props) => {
  const { name, price, category, _id } = props.product;
  return (
    <Col md={3} sm={12} className="my-2">
      <Card>
        <CardImg
          src="/images/item-2.jpg"
          className="card-img-top"
          alt="this is product thumb"
        />
        <div className="card-body">
          <div className="text-center">
            <div className="product_category">
              <span className="fw-lighter">{category}</span>
            </div>
            <div className="product_title">
              <h5>
                <Link to={`/product/${_id}`} className="text-decoration-none ">
                  {name.substring(0, 20)} ...
                </Link>
              </h5>
            </div>
            <div className="product_ratings">
              <span></span>
            </div>
            <div className="product_price d-flex justify-content-center">
              <span className="product_price_offer px-2">${price}</span>
              {/* <span className="product_price_original px-2 text-decoration-line-through">
                $450
              </span> */}
            </div>
            <div className="mt-3">
              <Button className="btn-add-cart">Add to Cart</Button>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;
