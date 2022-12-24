import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/reducers/features/auth/userAuthSlice";

import { Notify } from "notiflix/build/notiflix-notify-aio";

const Login = () => {
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const onChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginUser)).unwrap();
    setLoginUser({ email: "", password: "" });
  };

  useEffect(() => {

    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    if (error) {
      Notify.failure(error);
    }
  }, [dispatch, error, isAuthenticated]);

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
            <Form onSubmit={loginFormSubmit} method="post">
              <FormGroup className="mb-4">
                <FormControl
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={onChange}
                  required
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <FormControl
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={onChange}
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
