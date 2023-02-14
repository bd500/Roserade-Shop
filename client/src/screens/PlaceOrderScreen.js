import React, {useEffect} from "react";
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../slices/orderSlice";

function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const itemsPrice = cart.cartItem.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0
    );

    const shippingPrice = itemsPrice > 100 ? 0 : 100;
    const taxPrice = Math.round((0.1 * itemsPrice * 100) / 100);
    const totalPrice = taxPrice + itemsPrice;

    const {success, order, error} = useSelector((state) => state.order);
    const navigate = useNavigate();

    useEffect(() => {
        if (success) navigate(`order/${order._id}`);
    }, [success, navigate]);

    function placeOrderHandler() {
        dispatch(
            createOrder({
                cartItems: cart.cartItem.product,
                shippingAddress: cart.shipping,
                paymentMethod: cart.payment,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        );
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            {error && <Message variant="danger">{error}</Message>}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>{" "}
                                {cart.shipping.address}, {cart.shipping.city},{" "}
                                {cart.shipping.postalCode},{" "}
                                {cart.shipping.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {cart.payment}
                            </p>
                        </ListGroup.Item>
                        <ListGroup>
                            <h2>Order Items</h2>
                            {cart.cartItem.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItem.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product._id}`}
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${" "}
                                                    {item.product.price} ={" $"}
                                                    {(
                                                        item.qty *
                                                        item.product.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Sumary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        disabled={cart.cartItem === 0}
                                        type="button"
                                        onClick={placeOrderHandler}
                                    >
                                        Order Now
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

export default PlaceOrderScreen;
