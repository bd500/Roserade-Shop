import React from "react";
import {Container, Nav, Navbar, NavDropdown, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Routes, useNavigate} from "react-router-dom";
import {logout} from "../slices/loginSlice";
import SearchBox from "./SearchBox";

function Header() {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.login);

    const navigate = useNavigate();

    function logoutHandler() {
        dispatch(logout());
        navigate("/");
        navigate(0);
    }

    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            collapseOnSelect
            sticky="top"
        >
            <Container>
                <LinkContainer to={"/"}>
                    <Navbar.Brand>Roserade Shop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className="ms-auto">
                        <LinkContainer to={"/cart"}>
                            <Nav.Link>
                                <i class="fa-solid fa-cart-shopping"></i> Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        <i class="fa-solid fa-user"></i> Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i class="fa-solid fa-right-from-bracket"></i>{" "}
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <LinkContainer to={"/signup"}>
                                    <Nav.Link>
                                        <i class="fa-solid fa-user-plus"></i>{" "}
                                        Sign up
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={"/login"}>
                                    <Nav.Link>
                                        <i class="fa-solid fa-lock"></i> Login
                                    </Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title="Edit" id="edit">
                                <LinkContainer to="/admin/users">
                                    <NavDropdown.Item>
                                        <Row>
                                            <Col md={1}>
                                                <i class="fa-solid fa-people-group"></i>
                                            </Col>
                                            <Col>Users</Col>
                                        </Row>
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/products">
                                    <NavDropdown.Item>
                                        <Row>
                                            <Col md={1}>
                                                <i class="fa-solid fa-shirt"></i>
                                            </Col>
                                            <Col>Products</Col>
                                        </Row>
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orders">
                                    <NavDropdown.Item>
                                        <Row>
                                            <Col md={1}>
                                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                            </Col>
                                            <Col>Orders</Col>
                                        </Row>
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
