import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie Collator</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/add">Add Movie</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;