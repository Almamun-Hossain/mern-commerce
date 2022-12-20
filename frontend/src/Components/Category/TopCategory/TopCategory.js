import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SectionTitle from "../../SectionTitle/SectionTitle";
import CategoryCard from "./CategoryCard";

const TopCategory = () => {
  return (
    <section>
      <Container>
        <SectionTitle title="Top Categories" />
        <Row>
          <Col sm={12} md={4}>
            <CategoryCard />
          </Col>
          <Col sm={12} md={4}>
            <CategoryCard />
          </Col>
          <Col sm={12} md={4}>
            <CategoryCard />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopCategory;
