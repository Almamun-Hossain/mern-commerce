import React from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="side-menu">
      <ul>
        <li className="">
          <NavLink to="/user/account">My Account</NavLink>
        </li>
        <li className="">
          <NavLink to="/user/addresses">Addess Book</NavLink>
        </li>
        <li className="">
          <NavLink to="/user/orders">Oders</NavLink>
        </li>
        <li className="">
          <NavLink to="/user/returns-refund">Returns and Refund</NavLink>
        </li>
        <li className="">
          <NavLink to="/user/reviews">Reviews</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
