import React from "react";
import { Card } from "react-bootstrap";
import "./CategoryCard.css";
const CategoryCard = () => {
  return (
    <Card className="category-card my-3">
      <div className="category-title">
        <span>Category Name</span>
      </div>
    </Card>
  );
};

export default CategoryCard;
