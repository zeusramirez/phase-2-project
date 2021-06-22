function Header({ query, setQuery }) {

    return (
        <>
            <h1 style={{textDecorationLine: "underline"}}>Coin Tracker</h1>
            <form name="crypto-search" >
                <label>Crypto Seach</label>
                <input type="text" placeholder="Search Cryptos" value={query} onChange={e=> setQuery(e.target.value)}></input>
            </form>
        </>
    )
}

export default Header