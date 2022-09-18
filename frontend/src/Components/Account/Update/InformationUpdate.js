import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const InformationUpdate = () => {
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.auth);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(name)
    alert(name);
  };

  useEffect(() => {}, [user]);

  return (
    <div className="profile-information">
      <div className="card">
        <div className="card-body">
          <div className="tab-title mb-3 d-flex justify-content-between">
            <h5 className="card-title">Profile Information</h5>
            {disable ? (
              <Link
                to="#edit-profile"
                className="edit-link"
                onClick={() => setDisable(false)}
              >
                Edit Profile
              </Link>
            ) : (
              <Link
                to="#edit-profile"
                className="edit-link"
                onClick={() => setDisable(true)}
              >
                Cancel Update
              </Link>
            )}
          </div>
          <form onSubmit={formSubmit}>
            <FormGroup className="mb-3">
              <FormControl
                type="text"
                name="name"
                value={user.name}
                disabled={disable}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormControl
                type="email"
                name="email"
                value={user.email}
                disabled={true}
                required
              />
            </FormGroup>
            {!disable && (
              <Button type="submit" size="sm" className="btn-dark">
                Update
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InformationUpdate;
