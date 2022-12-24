import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CategoryCard.css";
const CategoryCard = ({ category }) => {
  const { name, slug, thumb } = category;
  return (
    <Link to={`category/${slug}`} className="text-decoration-none">
      <Card className="category-card my-3" style={{ backgroundImage: `url('http://localhost:4040/media/${thumb.filename}')` }}>
        <div className="category-title fs-5 fw-semibold">
          <span>{name}</span>
        </div>
      </Card>
    </Link>

  );
};

export default CategoryCard;
