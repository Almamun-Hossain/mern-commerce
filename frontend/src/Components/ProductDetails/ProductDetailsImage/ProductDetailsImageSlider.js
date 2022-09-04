import React, { Fragment } from "react";

import { Carousel } from "react-bootstrap";
const ProductDetailsImageSlider = ({ images, loading }) => {
  return (
    <Fragment>
      {loading ? (
        <h1>Images are loading</h1>
      ) : (
        <div className="product-details-images">
          <Carousel interval={null} fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/item-1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/item-2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/item-3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetailsImageSlider;
