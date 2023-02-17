import React, {useEffect, useState} from "react";
import {Row, Col, ListGroup, Card, Button, Image, Form} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../slices/productSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProductScreen() {
    const {id} = useParams();
    const [qty, setQty] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {loading, product, error} = useSelector(
        (state) => state.productsList
    );

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch]);

    function handleQtyChanged(event) {
        setQty(event.target.value);
    }

    function addToCartHandler() {
        if (qty !== "")
            navigate(`/cart/${id}?qty=${qty}`, {
                state: {product: product, qty: qty},
            });
    }

    return (
        <>
            <Link to={"/"} className="btn btn-light my-3">
                <i class="fa-solid fa-arrow-left"></i> Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={4}>
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
                                <h5>
                                    Price: $ {Number(product.price).toFixed(2)}
                                </h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span className="fw-bold">Description:</span>{" "}
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <span className="fw-bold">
                                                ${" "}
                                                {Number(product.price).toFixed(
                                                    2
                                                )}
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
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quatity: </Col>
                                            <Col>
                                                <Form.Select
                                                    //as="select"
                                                    value={qty}
                                                    onChange={handleQtyChanged}
                                                >
                                                    <option key="0" value="">
                                                        Select
                                                    </option>
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ProductScreen;
