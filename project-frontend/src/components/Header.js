import { useState } from 'react'
import {Button, InputGroup, FormControl, DropdownButton, Dropdown} from "react-bootstrap/";
import NavBar from './NavBar';


function Header({ setQuery, users, addSetUser, logOut, loggedIn, currentUser, setPageNumber }) {

    const [name, setName] = useState("")
    const [searchParam, setSearchParam] = useState("")
    // function handleUser(name) {}
    let usernameTags = users.map(user => <Dropdown.Item key={user.name} value={user.name} onClick={e => setName(e.target.textContent)}>{user.name}</Dropdown.Item>)

    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target[0].value
        addSetUser(name)
        setName("")
    }

    function handleSearch(e) {
        e.preventDefault()
        setQuery(e.target[0].value)
        setSearchParam("")
        // setName("")
    }

    function handleHome() {
        setQuery("")
        setPageNumber(1)
    }
 
    return (
        <>
            <NavBar handleHome={handleHome} currentUser={currentUser} loggedIn={loggedIn} logOut={logOut}/>
            <h1 style={{textDecorationLine: "underline"}}>Coin Tracker</h1>
            {loggedIn ? null:(<form onSubmit={e => handleSubmit(e)} name="user-login">
                <label>User Login</label>
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
                        title="Dropdown"
                        id="input-group-dropdown-2"
                        align="end"
                    >
                        {usernameTags}
                    </DropdownButton>
                    <Button type="submit" variant="outline-secondary">Login</Button>
                    {/* <InputGroup.Append>
                    <Button type="submit" variant="outline-secondary">Login</Button>
                    </InputGroup.Append> */}
                </InputGroup>
                {/* <input list="users" type="text" placeholder="Login To See List" value={name} onChange={e => setName(e.target.value)}></input>
                    <datalist id="users">
                        {usernameOptionTags}
                    </datalist>
                    <Button variant="success" type="submit">Log In</Button> */}
            </form>)
            }
            <br></br>
            <form onSubmit={e => handleSearch(e)} name="crypto-search" >
                <label>Crypto Seach</label>
                <InputGroup style={{width:"20%", margin:"auto"}} value={searchParam} onChange={e => setSearchParam(e.target.value)} className="mb-3">
                    <FormControl
                    placeholder="Search Cryptos"
                    aria-label="Search Cryptos"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                    <Button type="submit" variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* <input type="text" placeholder="Search Cryptos" value={searchParam} onChange={e => setSearchParam(e.target.value)}></input> */}
                {/* <Button type="submit">Search</Button> */}
            </form>
        </>
    )
}

export default Header