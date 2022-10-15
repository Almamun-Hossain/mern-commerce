import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/reducers/features/auth/userAuthSlice";
const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const { name, email, password } = registerUser;
  const onChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const { isLoading, isAuthenticated, token, user, error } = useSelector(
    (state) => state.auth
  );
  // const response = useCreateNewuserMutation();

  const dispatch = useDispatch();

  const registerFormSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(registerUser)).unwrap();
    setRegisterUser({
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user/account");
    }
  }, [dispatch, error, isAuthenticated, isLoading, user, token]);

  return (
    <>
      <Header />
      <Container>
        <div className="form-container">
          <div className="form-title-area text-center pb-4">
            <h1>Register</h1>
            <span>Please register using account detail bellow. </span>
          </div>
          <div className="account-form__inner">
            <Form onSubmit={registerFormSubmit} method="post">
              <FormGroup className="mb-4">
                <FormControl
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={onChange}
                  value={name}
                  required
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <FormControl
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={onChange}
                  value={email}
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
                  value={password}
                  required
                />
              </FormGroup>

              {/* <div className="sigle-item-input mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="checkbox-item">
                    <input type="checkbox" className="customize-checkbox" />
                    <label className="remember-label">Remember me</label>
                  </div>
                  <div className="forgot-passsword-container">
                    <Link to="/" className="forgot-password-link">
                      Forgot Password
                    </Link>
                  </div>
                </div>
              </div> */}

              <Button type="submit" className="btn-dark" disabled={isLoading}>
                Register
              </Button>
            </Form>
            <div className="pt-3 navigate-link-container">
              <Link to="/login" className="form-navigate-link">
                Login to exist account
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
