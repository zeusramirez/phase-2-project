import { useState } from 'react'

function Header({ query, setQuery, usernames, addSetUser }) {

    const [name, setName] = useState("")

    // function handleUser(name) {}

    let usernameOptionTags = usernames.map(username => <option key={username} value={username} />)

    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target[0].value
        addSetUser(name)
    }


    return (
        <>
            <h1 style={{textDecorationLine: "underline"}}>Coin Tracker</h1>
            <form onSubmit={e => handleSubmit(e)} name="user-login">
                <label>User Login</label>
                <input list="users" type="text" placeholder="Login Here To See List" value={name} onChange={e => setName(e.target.value)}></input>
                    <datalist id="users">
                        {usernameOptionTags}
                    </datalist>
                <button type="submit">Submit</button>
            </form>
            <br></br>
            <form name="crypto-search" >
                <label>Crypto Seach</label>
                <input type="text" placeholder="Search Cryptos" value={query} onChange={e=> setQuery(e.target.value)}></input>
            </form>
        </>
    )
}

export default Header