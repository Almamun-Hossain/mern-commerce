import React, { Fragment } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const ForgotPassword = () => {
  return (
    <Fragment>
      <Header />
      <Container>
        <div className="form-container">
          <div className="form-title-area text-center pb-4">
            <h1>Reset Password</h1>
            <span>
              {" "}
              Please provide your email and further instruction will send to
              your email.
            </span>
          </div>
          <div className="account-form__inner">
            <Form>
              <FormGroup className="mb-4">
                <FormControl
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn-dark">
                Login
              </Button>
            </Form>
            <div className="pt-3 navigate-link-container">
              <Link to="/login" className="form-navigate-link">
                Login to your account
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Fragment>
  );
};

export default ForgotPassword;
