import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const Contact = () => {
  return (
    <>
      <Header />
      <section>
        <div className="my-5">
          <Container>
            <div className="contact-form mx-auto w-50">
              <Card>
                <Card.Title className="text-center">
                  Hello Contact form
                </Card.Title>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group className="mb-2">
                          <Form.Label>Enter Your Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Input your name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Enter Your Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <textarea
                        className="form-control"
                        rows={4}
                        required
                        style={{ resize: "none" }}
                        placeholder="Your message..."
                      ></textarea>
                    </Form.Group>

                    <Button variant="btn btn-dark mt-3">SEND</Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
