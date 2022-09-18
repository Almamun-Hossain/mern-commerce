import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch, useSelector } from "react-redux";
import {
  passwordResetState,
  updatePassword,
} from "../../../store/reducers/features/auth/userResetPasswordSlice";

const PasswordsUpdate = () => {
  const [updatePasswordDisable, setUpdatePasswordDisable] = useState(true);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = password;

  const { isLoading, message, error } = useSelector(passwordResetState);
  const dispatch = useDispatch();

  const onChnageInput = (e) => {
    e.preventDefault();
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const onCencelUpdate = () => {
    setUpdatePasswordDisable(!updatePasswordDisable);
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const updatePasswordFormSubmit = (e) => {
    e.preventDefault();
    // if (!oldPassword && !newPassword && !confirmPassword) {
    //   Notify.failure("Input item shouldn't be empty!");
    //   return;
    // }
    dispatch(updatePassword(password));
  };

  useEffect(() => {
    if (error) {
      Notify.failure(error);
    }
    if (message) {
      Notify.success(message);
    }
  }, [dispatch, isLoading]);

  return (
    <div className="update-password ">
      <div className="card">
        <div className="card-body">
          <div className="tab-title mb-3 d-flex justify-content-between">
            <h5 className="card-title">Update Password</h5>
            {updatePasswordDisable ? (
              <Link
                to="#edit-profile"
                className="update-password"
                onClick={onCencelUpdate}
              >
                Update Password
              </Link>
            ) : (
              <Link
                to="#edit-profile"
                className="update-password"
                onClick={onCencelUpdate}
              >
                Cancel Update
              </Link>
            )}
          </div>

          <form onSubmit={updatePasswordFormSubmit}>
            <FormGroup className="mb-3">
              <FormControl
                type="password"
                name="oldPassword"
                placeholder="Old password"
                value={oldPassword}
                onChange={onChnageInput}
                disabled={updatePasswordDisable}
                required
              />
            </FormGroup>
            <Row>
              <Col sm={12} md lg={6}>
                <FormGroup className="mb-3">
                  <FormControl
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    value={newPassword}
                    onChange={onChnageInput}
                    disabled={updatePasswordDisable}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm={12} lg md={6}>
                <FormGroup className="mb-3">
                  <FormControl
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={onChnageInput}
                    disabled={updatePasswordDisable}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            {!updatePasswordDisable && (
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

export default PasswordsUpdate;
