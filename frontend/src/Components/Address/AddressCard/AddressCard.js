import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../../store/reducers/features/address/addressSlice";
import AddressEditCard from "../EditCard/AddressEditCard";

function AddressCard({ data }) {
  const [show, setShow] = useState(false);
  let dispatch = useDispatch();
  let state = null;
  let city = null;
  if (data && data.state && data.state.name) {
    state = data.state.name;
  }
  if (data && data.city && data.city.name) {
    city = data.city.name;
  }

  const onClickDeleteAddress = (e) => {
    e.preventDefault();
    dispatch(deleteAddress(data._id))
  }


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="mb-3">
      <Card>
        <Card.Header>
          <button className="btn btn-warning btn-sm me-2" onClick={handleShow}>Update</button>
          <button className="btn btn-danger btn-sm ms-2" onClick={onClickDeleteAddress}>Delete</button>
        </Card.Header>
        <Card.Body>
          <h5>Receiver Name: {data.name}</h5>
          <h5>
            Full Address: {data.address}, {state ? state + "," : ""} {city ? city + "," : ""} {data.country.name}-
            {data.zipcode}
          </h5>
          <h5>Phone Number: {data.phone}</h5>
          <h5>Alternative Contact: {data.secondaryPhone}</h5>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressEditCard data={data} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddressCard;
