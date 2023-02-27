import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
    return (
        <>
        <Navbar expand='sm' bg='primary' variant='dark'>
            <Container fluid='fluid'>
                <Navbar.Brand href="/">The Zalewski Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='justify-content-start'>
                        <Nav.Link href="https://www.zalewskifamily.net/tzp">Interactive Tree</Nav.Link>
                        <NavDropdown title="Census" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/census">View Year List</NavDropdown.Item>
                            <NavDropdown.Item href="/census/1880">1880</NavDropdown.Item>
                            <NavDropdown.Item href="/census/1900">1900</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/cemetery">Cemetery Records</Nav.Link>
                        <Nav.Link href="/deaths">Milwaukee Death Records</Nav.Link>
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