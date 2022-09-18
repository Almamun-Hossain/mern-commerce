import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, FormControl, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Account/Sidebar/Sidebar";
import InformationUpdate from "../Components/Account/Update/InformationUpdate";
import PasswordsUpdate from "../Components/Account/Update/PasswordUpdate";
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
  }, [dispatch, isAuthenticated, user]);

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

        <div className="profile-container">
          <div className="row">
            <div className="left-container col-md-3 col-lg-3 col-3">
              <Sidebar />
            </div>
            <div className="right-container col-md-9 col-lg-9 col-9">
              {/* Edit Profile Information like name, email, gende,dob etc */}
              <div className="row">
                <div className="col-md-6 col-lg-6 col-12">
                  <InformationUpdate user={user} />
                </div>
                <div className="col-md-6 col-lg-6 col-12">
                  {/* Update Password */}
                  <PasswordsUpdate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Account;
