import React from "react";
import "./HeaderSlider.css";
import { Carousel } from "react-bootstrap";
const HeaderSlider = () => {
  return (

    <Carousel className="">
      <Carousel.Item>
        <img className="d-block slider-image" src="/images/item-1.jpg" alt="slider first" />
        <Carousel.Caption>
          <h3>First Slider Label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block slider-image" src="/images/item-2.jpg" alt="slider second" />
        <Carousel.Caption>
          <h3>First Slider Label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block slider-image" src="/images/item-3.jpg" alt="slider third" />
        <Carousel.Caption>
          <h3>First Slider Label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeaderSlider;
