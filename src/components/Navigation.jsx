import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/navigation.css";

function Navigation() {
  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as="span" className="fs-6 logo-panerai fs-4">
          PANERAI
        </Navbar.Brand>

        <Link to="/" className="links-styles">
          Orders
        </Link>

        <Link to="/admin" className="links-styles">
          Admins
        </Link>

        <Link to="/products" className="links-styles">
          Products
        </Link>

        <Link to="/login" className="links-styles">
          Login
        </Link>

        <Link to="/collections" className="links-styles">
          Collections
        </Link>
      </Container>
    </Navbar>
  );
}

export default Navigation;
