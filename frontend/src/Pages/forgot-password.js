import React, { Fragment, useEffect, useState } from "react";
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
import {
  passwordResetState,
  sendResetToken,
} from "../store/reducers/features/auth/userResetPasswordSlice";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isLoading, message, error } = useSelector(passwordResetState);
  const dispatch = useDispatch();
  const inputChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetToken(email));
    setEmail("");
  };
  useEffect(() => {
    if (error) {
      Notify.failure(error);
    }
    if (message) {
      Notify.success(message);
    }
  }, [isLoading, error, message]);

  return (
    <Fragment>
      <Header />
      <Container>
        {/* {error && (
          <div className="alert alert-danger -50 mx-auto" role="alert">
            {error}
          </div>
        )} */}
        <div className="form-container">
          <div className="form-title-area text-center pb-4">
            <span>Reset Password</span>
            <span>
              Please provide your email and further instruction will send to
              your email.
            </span>
          </div>
          <div className="account-form__inner">
            <Form onSubmit={formSubmit}>
              <FormGroup className="mb-4">
                <FormControl
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={inputChange}
                  value={email}
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn-dark" disabled={isLoading}>
                Submit
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
