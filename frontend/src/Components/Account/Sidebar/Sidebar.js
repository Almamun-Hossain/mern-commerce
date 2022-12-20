import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="side-menu">
      <ul>
        <li className="">
          <NavLink to="/user/account">My Account</NavLink>
        </li>
        <li className="">
          <NavLink to="/user/addresses">Address Book</NavLink>
        </li>
        <li className="">
          <NavLink to="/user/orders">Orders</NavLink>
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
