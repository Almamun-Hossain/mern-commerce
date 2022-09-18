import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProuductCard/ProductCard";
import "./Products.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/reducers/features/products/productSlice";

const Products = () => {
  const { isLoading, products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <section>
      <Container>
        <SectionTitle title="Latest Products" />
        <div className="products_row">
          <Row>
            {isLoading && <h1>Fetching products...</h1>}
            {error && <h2>{error}</h2>}
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Products;
