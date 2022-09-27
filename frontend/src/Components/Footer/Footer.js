import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer text-center py-3">
      <span className="align-items-center">
        All right reserved by{" "}
        <Link to="/" className="text-decoration-none text-danger">
          Free Shopper{" "}
        </Link>{" "}
        @{new Date().getFullYear()}
      </span>
    </div>
  );
}
