import React from "react";
// import Swiper core and required modules
import { Navigation, Autoplay, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// Import Swiper styles
import "swiper/swiper.min.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/thumbs/thumbs.min.css";

import "./HeaderSlider.css";
import { Container } from "react-bootstrap";
const HeaderSlider = () => {
  return (
    <Container className="swiper-container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay, A11y]}
        slidesPerView={1}
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img className="img-fluid" src="images/item-1.jpg" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-fluid" src="images/item-2.jpg" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-fluid" src="images/item-3.jpg" alt="slider" />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default HeaderSlider;
