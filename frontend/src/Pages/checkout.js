import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import {
  addressState,
  fetchUserAddress,
} from "../store/reducers/features/address/addressSlice";

function Checkout() {
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const { addresses } = useSelector(addressState);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(fetchUserAddress());
  }, [dispatch, isAuthenticated]);

  return (
    <Fragment>
      <Header />
      <Container>
        <h1>Check Out the order</h1>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Checkout;
