import React from "react";
import "./SectionTitle.css";
const SectionTitle = ({ title }) => {
  return (
    <div className="section__headline">
      <h1>{title}</h1>
    </div>
  );
};

export default SectionTitle;
