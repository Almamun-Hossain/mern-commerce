import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";

function AddressEditCard({ item }) {
  const [close, setClose] = useState(item.show);
  let { show } = item;
  const handleClose = () => setClose(false);

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <input type="text" className="form-control" required />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddressEditCard;
