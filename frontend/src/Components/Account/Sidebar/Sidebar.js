import React from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="side-menu">
      <ul>
        <li className="main-title active">
          <NavLink to="/user/account">My Account</NavLink>
        </li>
        <li className="">
          <Link to="/user/addresses">Addess Book</Link>
        </li>
        <li className="">
          <Link to="/user/orders">Oders</Link>
        </li>
        <li className="">
          <Link to="/user/returns-refund">Returns and Refund</Link>
        </li>
        <li className="">
          <Link to="/user/reviews">Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
