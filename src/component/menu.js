import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import renewAccessToken from "./authentication/renewAccessToken";
//import "./menu.css"

export default function Menu() {
    let username = localStorage.getItem("username");
    let navigate = useNavigate();

    function logout() {
        axios
            .post("auth/logout")
            .then(() => {
                localStorage.setItem("authenticated", "");
                localStorage.removeItem("authenticated");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.toJSON());
                renewAccessToken();
                if (localStorage.getItem("authenticated"))
                    logout();
                else navigate("/login");
            })
    }

    return (
        <Navbar bg="black" expand="lg" className="px-4">
            <Container fluid>
                <Navbar.Brand href="/welcome" className="text-white">AimTrainer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/welcome" className="text-white">Play</Nav.Link>
                        <Nav.Link href="/scores-table" className="text-white">Scores table</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end px-5">
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/change-nickname">Change nickname</NavDropdown.Item>
                            <NavDropdown.Item href="/change-password">Change password</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => logout()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
