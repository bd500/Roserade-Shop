import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";
import {logout} from "../slices/loginSlice";

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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
