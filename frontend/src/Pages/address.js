import React, { Fragment, useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Components/Account/Sidebar/Sidebar";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import {
  addressState,
  fetchUserAddress,
} from "../store/reducers/features/address/addressSlice";
import AddressCard from "../Components/Address/AddressCard/AddressCard";
import AddressAddCard from "../Components/Address/EditCard/AddressAddCard";

function Address() {
  const [show, setShow] = useState(false);
  let { isLoading, addresses } = useSelector(addressState);
  const dispatch = useDispatch();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch, isLoading]);

  return (
    <Fragment>
      <Header />
      <Container>
        <div className="profile-container">
          <div className="row">
            <div className="left-container col-md-3 col-lg-3 col-3">
              <Sidebar />
            </div>
            <div className="right-container col-md-9 col-lg-9 col-9">
              {/* Edit Profile Information like name, email, gende,dob etc */}
              {/* Section  title */}
              <div className="section-title d-flex justify-content-between my-2">
                <h5>All business Address</h5>{" "}
                <button
                  className="btn btn-sm btn-primary px-3"
                  onClick={handleShow}
                >
                  Add
                </button>
              </div>
              {addresses &&
                addresses.map((address) => {
                  return <AddressCard key={address._id} data={address} />;
                })}
            </div>
          </div>
        </div>
      </Container>
      {/* {show && <AddressEditCard item={{ show }} />} */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressAddCard />
        </Modal.Body>
      </Modal>

      <Footer />
    </Fragment>
  );
}

export default Address;
