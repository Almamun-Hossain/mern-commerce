import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import { userLogout } from "../store/reducers/features/auth/userAuthSlice";

const Account = () => {
  const { isLoading, isAuthenticated, token, user, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const userClickLogout = () => {
    dispatch(userLogout()).unwrap();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, isLoading, user, token]);

  return (
    <Fragment>
      <Header />
      <Container>
        <h1>Welcome to account page</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={userClickLogout}
        >
          Logout
        </button>
      </Container>
    </Fragment>
  );
};

export default Account;
