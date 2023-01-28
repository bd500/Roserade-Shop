import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
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
            <LinkContainer to={"/signup"}>
              <Nav.Link>
                <i class="fa-solid fa-user-plus"></i> Sign up
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/login"}>
              <Nav.Link>
                <i class="fa-solid fa-lock"></i> Login
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
