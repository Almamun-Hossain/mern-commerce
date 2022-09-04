import React, { Fragment, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import ProductDetailsImageSlider from "../Components/ProductDetails/ProductDetailsImage/ProductDetailsImageSlider";
import ProductSummary from "../Components/ProductDetails/ProductsSummary/ProductSummary";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../store/reducers/features/products/productDetailsSlice";
import { ReviewCard } from "../Components/Review/ReviewCard";

const ProductDetails = () => {
  const { productId } = useParams();
  const { isLoading, productDetails, error } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <Fragment>
      <Header />
      <Container>
        <div className="product-details-container my-4">
          {isLoading ? (
            <h1>Loading product details...</h1>
          ) : (
            <Fragment>
              {productDetails && (
                <div>
                  <Row>
                    <Col md={5} lg={5}>
                      <ProductDetailsImageSlider
                        images={productDetails.images}
                        loading={isLoading}
                      />
                    </Col>
                    <Col md={7}>
                      <ProductSummary
                        product={productDetails}
                        loading={isLoading}
                      />
                    </Col>
                  </Row>

                  {/* Showing reviews */}
                  <div className="product-reviews my-5">
                    <h3>Product Reviews</h3>
                    <hr></hr>
                    {productDetails.reviews &&
                      productDetails.reviews.map((review) => {
                        return <ReviewCard review={review} />;
                      })}
                  </div>

                  {/* End of review */}
                </div>
              )}
            </Fragment>
          )}
          {error && <h1>{error}</h1>}
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
