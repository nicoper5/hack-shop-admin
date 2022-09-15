import { Nav, Container, Navbar } from "react-bootstrap";

import "../css/navigation.css";

function Navigation() {
  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as="span" className="fs-6 logo-panerai fs-4">
          PANERAI
        </Navbar.Brand>
        <Nav.Link className="text-white" href="/">
          Orders
        </Nav.Link>
        <Nav.Link className="text-white" href="/admin">
          Admin
        </Nav.Link>
        <Nav.Link className="text-white" href="/product">
          Product
        </Nav.Link>
        <Nav.Link className="text-white" href="/collections">
          Collection
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Navigation;
