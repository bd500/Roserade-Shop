import React, {useEffect} from "react";
import {
    Col,
    Container,
    ListGroup,
    Row,
    Image,
    Button,
    Card,
    ListGroupItem,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {addItemToCart, removeItem} from "../slices/cartSlice";
import Message from "../components/Message";

function CartScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state ? location.state.product : null;
    const qtyString = location.state ? location.state.qty : null;
    const qty = Number(qtyString);

    const dispatch = useDispatch();
    const {cartItem} = useSelector((state) => state.cart);

    useEffect(() => {
        if (product) dispatch(addItemToCart({product: product, qty: qty}));
    }, [dispatch, product, qty]);

    function removeFromCartHandler(id) {
        dispatch(removeItem(id));
    }

    function purchaseHandler() {
        navigate("/login?redirect=shipping");
    }

    return (
        <>
            {" "}
            <h2>Your Cart</h2>
            <Row>
                <Col md={8}>
                    {cartItem.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItem.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.product.image}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Link
                                                to={`/products/${item.product._id}`}
                                            >
                                                {item.product.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            $ {item.product.price.toFixed(2)}
                                        </Col>
                                        <Col md={2}>{item.qty}</Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={removeFromCartHandler.bind(
                                                    this,
                                                    item.product._id
                                                )}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>
                                    Subtotal{" ("}
                                    {cartItem.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    {") "}
                                    items
                                </h3>
                            </ListGroupItem>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={6}>
                                        <h1>$</h1>
                                    </Col>
                                    <Col md={6}>
                                        <h1>
                                            {cartItem
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.qty *
                                                            item.product.price,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </h1>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        type="button"
                                        className="btn-block"
                                        disabled={cartItem.length === 0}
                                        onClick={purchaseHandler}
                                    >
                                        <i className="fas fa-cash-register ms-6"></i>
                                        &nbsp;
                                        <span style={{marginLeft: "10px"}}>
                                            Purchase
                                        </span>
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

export default CartScreen;
