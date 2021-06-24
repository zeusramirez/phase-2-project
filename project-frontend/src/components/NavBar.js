import {Form, Navbar, Nav, Button} from "react-bootstrap/";
function NavBar(props) {
    const {currentUser, handleHome, loggedIn, logOut} = props
    return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={handleHome}>Flatiron Crypto Trading</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
        </Nav>
      {loggedIn ? <><Navbar.Text>Signed in as: {currentUser}</Navbar.Text><Button variant="warning" type="Button" onClick={() => logOut()}>Log Out</Button></> : <Navbar.Text>Not signed in</Navbar.Text>
}
    </Navbar>
    )
}

export default NavBar