import {Navbar, Nav, Button} from "react-bootstrap/";
// import {NavLink} from 'react-router-dom';

function NavBar(props) {
    const {currentUser, handleHome, isLoggedIn, logOut} = props
    return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={"/"}>Flatiron Crypto Trading</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href={"/"} onClick={handleHome} >Home</Nav.Link>
        </Nav>
      {isLoggedIn ? <span><Navbar.Text>Signed in as: {currentUser}</Navbar.Text> {" "} {logOut === undefined ? null :<Button size="sm" variant="warning" type="Button" onClick={() => logOut()}>Log Out</Button>}</span> : <Navbar.Text>Not signed in</Navbar.Text>
}
    </Navbar>
    )
}

export default NavBar