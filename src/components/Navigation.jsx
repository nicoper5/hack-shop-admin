import { Nav, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../css/navigation.css";

function Navigation() {
  const navigate = useNavigate();
  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as="span" className="fs-6 logo-panerai fs-4">
          PANERAI
        </Navbar.Brand>
        <Nav.Link className="text-white" onClick={() => navigate("/")}>
          Orders
        </Nav.Link>
        <Nav.Link className="text-white" onClick={() => navigate("/admin")}>
          Admins
        </Nav.Link>
        <Nav.Link className="text-white" onClick={() => navigate("/products")}>
          Products
        </Nav.Link>
        <Nav.Link
          className="text-white"
          onClick={() => navigate("/collections")}
        >
          Collections
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Navigation;
