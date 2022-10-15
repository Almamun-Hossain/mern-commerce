import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Components/Account/Sidebar/Sidebar";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

function Orders() {
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
              <h1>Shwoing all orders</h1>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Orders;
