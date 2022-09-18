import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch, useSelector } from "react-redux";
import {
  passwordResetState,
  resetPassword,
} from "../store/reducers/features/auth/userResetPasswordSlice";

// ? Functional Component
export const ResetPassword = () => {
  const { resetToken } = useParams();
  const [credential, setCredential] = useState({
    password: "",
    confirmPassword: "",
  });

  const { isLoading, message, error } = useSelector(passwordResetState);
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    e.preventDefault();
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // reset password form submit
  const resetFormSubmit = (e) => {
    e.preventDefault();

    if (credential.password !== credential.confirmPassword) {
      Notify.failure("Incorrect Confirm Password");
      setCredential({ confirmPassword: "" });
      return;
    }
    dispatch(resetPassword(credential, resetToken));
    setCredential({
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (error) {
      Notify.failure(error);
    }
    if (message) {
      Notify.success(message);
    }
  }, [isLoading, message, error]);

  return (
    <Fragment>
      <Header />
      <Container>
        <div className="form-container">
          <div className="form-title-area text-center pb-4">
            <h1>Reset Password</h1>
            <span>Please set your new password</span>
          </div>
          <div className="account-form__inner">
            <Form onSubmit={resetFormSubmit}>
              <FormGroup className="mb-4">
                <FormControl
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="New password"
                  value={credential.password}
                  onChange={onChangeInput}
                  required
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <FormControl
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={credential.confirmPassword}
                  onChange={onChangeInput}
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn-dark" disabled={isLoading}>
                Update Password
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
