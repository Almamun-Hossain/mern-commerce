import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";

import NavbarToggle from "react-bootstrap/NavbarToggle";

import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" navabr="light" className="py-3">
        <Container className="d-flex justify-content-between navigation">
          <NavbarBrand href="/">Free Shopper</NavbarBrand>
          <NavbarToggle
            aria-controls="basic-navbar-nav"
            className="toggle-icon"
          />
          <NavbarCollapse
            id="badic-navbar-nav"
            className="justify-content-center"
          >
            <Nav>
              <Link to="/" className="nav-link active">
                Home
              </Link>
              <NavDropdown title="Products" id="products-category-dropdown">
                <Link to="" className="dropdown-item">
                  Clothes
                </Link>
                <Link to="" className="dropdown-item">
                  Books
                </Link>
                <Link to="" className="dropdown-item">
                  Shoes
                </Link>
              </NavDropdown>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              {/* <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link> */}
            </Nav>
          </NavbarCollapse>
          <Nav className="iconic-action">
            <Link to="" className="iconic-link nav-link">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
            <Link to="/cart" className="iconic-link nav-link">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <Link to="/login" className="iconic-link nav-link">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
