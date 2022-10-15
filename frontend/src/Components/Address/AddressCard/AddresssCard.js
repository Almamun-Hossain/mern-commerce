import React from "react";
import { Card } from "react-bootstrap";

function AddresssCard({ data }) {
  let state = null;
  let city = null;
  if (data && data.state && data.state.name) {
    state = data.state.name;
  }
  if (data && data.city && data.city.name) {
    city = data.city.name;
  }
  return (
    <div className="mb-3">
      <Card>
        <Card.Header>
          <button className="btn btn-warning btn-sm me-2">Update</button>
          <button className="btn btn-danger btn-sm ms-2">Delete</button>
        </Card.Header>
        <Card.Body>
          <h5>Receiver Name: {data.name}</h5>
          <h5>
            Full Address: {data.address}, {state}, {city}, {data.country.name} -
            {data.zipcode}
          </h5>
          <h5>Phone Number: {data.phone}</h5>
          <h5>Alternative Contact: {data.secondaryPhone}</h5>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddresssCard;
