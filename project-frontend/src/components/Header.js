import { useState } from 'react'

function Header({ setQuery, users, addSetUser, logOut, loggedIn }) {

    const [name, setName] = useState("")
    const [searchParam, setSearchParam] = useState("")
    // function handleUser(name) {}
    let usernameOptionTags = users.map(user => <option key={user.name} value={user.name} />)

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
    }
 
    return (
        <>
            <h1 style={{textDecorationLine: "underline"}}>Coin Tracker</h1>
            {loggedIn ? (<button type="button" onClick={() => logOut()}>Log Out</button>):(<form onSubmit={e => handleSubmit(e)} name="user-login">
                <label>User Login</label>
                <input list="users" type="text" placeholder="Login To See List" value={name} onChange={e => setName(e.target.value)}></input>
                    <datalist id="users">
                        {usernameOptionTags}
                    </datalist>
                    <button type="submit">Log In</button>
            </form>)
            }
            <br></br>
            <form onSubmit={e => handleSearch(e)} name="crypto-search" >
                <label>Crypto Seach</label>
                <input type="text" placeholder="Search Cryptos" value={searchParam} onChange={e => setSearchParam(e.target.value)}></input>
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default Header