import { useState } from 'react'
import {Button, InputGroup, FormControl, DropdownButton, Dropdown} from "react-bootstrap/";
import NavBar from './NavBar';


function Header({ setQuery, users, addSetUser, logOut, isLoggedIn, currentUser, setPageNumber, setCurrentUser, setLoggedIn }) {

    const [name, setName] = useState("")
    const [searchParam, setSearchParam] = useState("")
    // function handleUser(name) {}
    let usernameTags = users.map(user => <Dropdown.Item key={user.name} value={user.name} onClick={e => setName(e.target.textContent)}>{user.name}</Dropdown.Item>)

    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target[0].value
        addSetUser(name)
        handleHome()
        setName("")
    }

    function handleSearch(e) {
        e.preventDefault()
        setSearchParam("")
        setQuery(e.target[0].value)
        // setName("")
    }

    function handleHome() {
        setQuery("")
        setPageNumber(1)
    }
 
    return (
        <>
            <NavBar handleHome={handleHome} currentUser={currentUser} isLoggedIn={isLoggedIn} logOut={logOut}/>
            <br></br>
            <h1 style={{textDecorationLine: "underline"}}>Coin Tracker</h1>
            <br></br>
            {isLoggedIn ? null:(<form onSubmit={e => handleSubmit(e)} name="user-login">
                <label>User Login / Sign Up</label>
                <InputGroup style={{width:"20%", margin:"auto"}} className="mb-3">
                    <FormControl
                    placeholder="User Login"
                    aria-label="User Login"
                    aria-describedby="basic-addon2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <DropdownButton
                        variant="outline-secondary"
                        title="Users"
                        id="input-group-dropdown-2"
                        align="end"
                    >
                        {usernameTags}
                    </DropdownButton>
                    <Button type="submit" variant="outline-secondary">Login</Button>
                </InputGroup>
            </form>)
            }
            <form onSubmit={e => handleSearch(e)} name="crypto-search" >
                <label>Crypto Seach</label>
                <InputGroup style={{width:"20%", margin:"auto"}} className="mb-3">
                    <FormControl
                    placeholder="Search Cryptos"
                    aria-label="Search Cryptos"
                    aria-describedby="basic-addon2"
                    value={searchParam}
                    onChange={e => setSearchParam(e.target.value)}
                    />
                    <InputGroup.Append>
                    <Button type="submit" variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
        </>
    )
}

export default Header