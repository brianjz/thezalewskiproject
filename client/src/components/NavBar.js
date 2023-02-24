import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
    return (
        <>
        <Navbar expand='sm' bg='primary' variant='dark'>
            <Container fluid='fluid'>
                <Navbar.Brand href="https://www.thezalewskiproject.com/">The Zalewski Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='justify-content-start'>
                        <Nav.Link href="https://www.thezalewskiproject.com/tree">Family Tree</Nav.Link>
                        <NavDropdown title="Census" id="basic-nav-dropdown">
                            <NavDropdown.Item href="https://www.thezalewskiproject.com/census">View Year List</NavDropdown.Item>
                            <NavDropdown.Item href="https://www.thezalewskiproject.com/census#census/1880">1880</NavDropdown.Item>
                            <NavDropdown.Item href="https://www.thezalewskiproject.com/census#census/1900">1900</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="https://www.thezalewskiproject.com/cemetery.php">Cemetery Records</Nav.Link>
                        <Nav.Link href="/">Milwaukee Death Records</Nav.Link>
                    </Nav>
                    <Nav className='ms-auto'>
                        <Nav.Link href="https://www.zalewskifamily.net">Zalewski Family Genealogy</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}

export default NavBar;