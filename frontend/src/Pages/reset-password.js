import React, { Fragment } from "react";
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

export const ResetPassword = () => {
  const { resetToken } = useParams();
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
            <Form>
              <FormGroup className="mb-4">
                <FormControl
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  required
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <FormControl
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
              </FormGroup>
              <Button type="submit" className="btn-dark">
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
