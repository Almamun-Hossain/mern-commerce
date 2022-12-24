import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../../store/reducers/features/category/categorySlice";
import SectionTitle from "../../SectionTitle/SectionTitle";
import CategoryCard from "./CategoryCard";

const TopCategory = () => {
  const { isLoading, categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategory())
  }, [dispatch])

  return (
    <section>
      <Container>
        <SectionTitle title="Top Categories" />
        <Row>
          {isLoading && <div className="text-center py-3"><h3>Fetching category...</h3></div>}
          {categories && categories.slice(0,8).map((category) => (
            <Col sm={12} md={3}>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TopCategory;
