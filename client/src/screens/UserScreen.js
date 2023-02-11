import React, {useEffect} from "react";
import {Button, Row, Col, Form} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../slices/userDetailsSlice";
import {useNavigate} from "react-router-dom";

function UserScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, error, success} = useSelector((state) => state.userDetails);

    const {userInfo} = useSelector((state) => state.login);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        } else {
            navigate("/login");
        }
    }, [dispatch, userInfo, navigate]);

    function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPass) setMessage("Passwords do not match!");
        else {
            dispatch(
                updateUser({
                    id: userInfo._id,
                    email: email,
                    password: password,
                    name: name,
                })
            );
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h1>My Profile</h1>
                {loading && <Loader />}
                {error && <Message variant={"danger"}>{error}</Message>}
                {message && <Message variant={"danger"}>{message}</Message>}
                {success && (
                    <Message variant={"success"}>
                        {"Update successfully."}
                    </Message>
                )}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="my-3">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h1>My Orders</h1>
            </Col>
        </Row>
    );
}

export default UserScreen;
