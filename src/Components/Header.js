import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import homeIcon from "../assets/icons/home.svg"

function Header() {
    return (

        <Navbar expand="lg" variant="dark" className="shadow bg-white">
            <Container>
                <Link to="/" className="navbar-brand" style={{ color: "#4A4A4A" }}>
                    <b> Movies Details</b>
                </Link>
                <Nav>
                    <Link to="/" className="home-icon">
                        <img src={homeIcon} alt="home" height={'28px'} />
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
