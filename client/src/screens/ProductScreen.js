import React from "react";
import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";

function ProductScreen() {
    const { id } = useParams();
    const product = products.find((p) => p._id === id);
    return (
        <>
            <Link to={"/"} className="btn btn-light my-3">
                Go back
            </Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                stars={product.rating}
                                reviews={product.numReviews}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Price: $ {product.price.toFixed(2)}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className="fw-bold">Description:</span>{" "}
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <span className="fw-bold">
                                            $ {product.price.toFixed(2)}
                                        </span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0
                                            ? "In stock"
                                            : "Out of stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ProductScreen;
