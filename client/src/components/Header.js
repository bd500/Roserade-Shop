import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap"

function Header(){
    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand href="/">Roserade Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link href="/cart"><i class="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                <Nav.Link href="/signup"><i class="fa-solid fa-user-plus"></i> Sign up</Nav.Link>
                <Nav.Link href='/login'><i class="fa-solid fa-lock"></i> Login</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;