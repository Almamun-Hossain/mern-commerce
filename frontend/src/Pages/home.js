import React from "react";
import Products from "../Components/Products/Products";
import Header from "../Components/Header/Header";
import HeaderSlider from "../Components/HeaderSlider/HeaderSlider";
import TopCategory from "../Components/Category/TopCategory/TopCategory";
import Footer from "../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <HeaderSlider />
      <TopCategory />
      <Products />
      <Footer />
    </>
  );
};

export default Home;
