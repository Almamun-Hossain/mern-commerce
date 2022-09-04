import React from "react";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

export const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    count: 5,
    isHalf: true,
    activeColor: "#ff4545",
    color: "#cccccc",
    value: review.rating,
    size: 18,
  };
  return (
    <div className="mb-3">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <h4>{review.name}</h4>
            <span>
              <ReactStars {...options}></ReactStars>
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote">
            <p>{review.comment}</p>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
};
