import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

export const ErrorPage = () => {
  return (
    <Fragment>
      <Header />
      <Container>
        <div className="text-center my-5">
          <h3 className="text-danger">There's nothing here: 404!</h3>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};
