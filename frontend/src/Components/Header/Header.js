import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import NavbarToggle from "react-bootstrap/NavbarToggle";

import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { totalCartItem } from "../../store/reducers/features/cart/cartSelector";

const Header = () => {
  const state = useSelector((state) => state);
  let total = totalCartItem(state);
  let { isAuthenticated } = state.auth;
  return (
    <header>
      <Navbar bg="light" expand="lg" navbar="light" className="py-3">
        <Container className="d-flex justify-content-between navigation">
          <NavLink to="/" className={"navbar-brand"}>
            Free Shopper
          </NavLink>
          <NavbarToggle
            aria-controls="basic-navbar-nav"
            className="toggle-icon"
          />
          <NavbarCollapse
            id="badic-navbar-nav"
            className="justify-content-center"
          >
            <Nav>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavDropdown title="Products" id="products-category-dropdown">
                <NavLink to="" className="dropdown-item">
                  Clothes
                </NavLink>
                <Link to="" className="dropdown-item">
                  Books
                </Link>
                <Link to="" className="dropdown-item">
                  Shoes
                </Link>
              </NavDropdown>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
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
              <FontAwesomeIcon icon={faCartShopping} /> <b>{total}</b>
            </Link>
            <Link to={isAuthenticated?"/user/account":"/login"} className="iconic-link nav-link">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
