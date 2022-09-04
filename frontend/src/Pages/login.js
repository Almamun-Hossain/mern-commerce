import React from "react";
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

const Login = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="form-container">
          <div className="form-title-area text-center pb-4">
            <h1>Login</h1>
            <span>Please login using account detail bellow. </span>
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

              <FormGroup className="mb-4">
                <FormControl
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>

              <div className="sigle-item-input mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="checkbox-item">
                    <input type="checkbox" className="customize-checkbox" />
                    <label className="remember-label">Remember me</label>
                  </div>
                  <div className="forgot-passsword-container">
                    <Link to="/reset-password" className="forgot-password-link">
                      Forgot Password
                    </Link>
                  </div>
                </div>
              </div>

              <Button type="submit" className="btn-dark">
                Login
              </Button>
            </Form>
            <div className="pt-3 navigate-link-container">
              <Link to="/register" className="form-navigate-link">
                Create a new account
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Login;
