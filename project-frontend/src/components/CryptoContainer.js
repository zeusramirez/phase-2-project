import React, {useEffect, useState} from 'react'
import WatchContainer from './WatchContainer'
import CryptoTable from './CryptoTable'
import Cryptos from './Cryptos'
import Header from './Header'



const apiKey = process.env.REACT_APP_KEY

function CryptoContainer(props) {
const {isLoggedIn, currentUser, setLoggedIn, setCurrentUser}= props
let [pageNumber, setPageNumber] = useState(1)
let [cryptoData, setData] = useState([])
let [allData, setAllData] = useState([])
let [query, setQuery] = useState("")
let [users, setUsers] = useState([])
// let [currentUser, setCurrentUser] = useState("")
let [userId, setCurrentId] = useState(0)
let [watchlist, setWatchlist] = useState([])
// let [isLoggedIn, setLoggedIn] = useState(false)


    function handlePageNumber(e) {
        console.log(e.target.className)
        let value = e.target.value
        if (value === "next") {
        setPageNumber(pageNumber + 1)
        document.documentElement.scrollTop = 0;
        e.target.blur()
        } else if (value=== "previous") {
            setPageNumber(pageNumber - 1)
            document.documentElement.scrollTop = 0;
            e.target.blur()
        }
    }
    useEffect(()=> {
        setTimeout(()=> {
            fetch(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&status=active`)
            .then(res => res.json())
            .then(data => setAllData(data))
        },1000)
        },[])

    useEffect(()=> {
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&status=active&per-page=100&page=${pageNumber}`)
        .then(res => res.json())
        .then(data => setData(data))
    },[pageNumber])

    // useEffect(()=> {
    //     fetch("http://localhost:3000/user/{}")
    //     .then(res => res.json())
    //     .then(data => setTracked(data))
    // },[isLoggedIn])

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            setUsers(data)
            data.forEach(user => {
                if (user.loggedIn) {
                    setCurrentUser(user.name)
                    setCurrentId(user.id)
                    setWatchlist(user.watchlist)
                    setLoggedIn(user.loggedIn)
                }
            })
        })
    },[])
    
    function addToWatchList(currency) {
        if (!watchlist.includes(currency) && isLoggedIn) {
            fetch(`http://localhost:3000/users/${userId}`,{
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "watchlist": [...watchlist, currency]
                })
            })
            .then(res => res.json())
            .then(data => {
                setWatchlist(data.watchlist)
            })
        }
    }
    
    function deleteFromWatchlist(id) {
        let updatedWatchlist = watchlist.filter(crypto => crypto !== id)
        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "watchlist": [...updatedWatchlist]
            })

        })
        .then(res => res.json())
        .then (() => {
            setWatchlist(updatedWatchlist)
        })
    }
    
    let usernames = users.map(users => users.name)

    function addSetUser(name) {
        if (usernames.includes(name)) {
            // setCurrentUser(name);
            users.forEach(user => {
                if (user.name === name) {
                    fetch(`http://localhost:3000/users/${user.id}`, {
                        method:"PATCH",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            "loggedIn": true
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                        // setUsers([...users, data.name])
                        setCurrentUser(data.name)
                        setWatchlist(data.watchlist)
                        setCurrentId(data.id)
                        setLoggedIn(data.loggedIn)
                    })
                }
            })
        }
        else
        fetch("http://localhost:3000/users", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "name": name,
                "loggedIn": true,
                "watchlist": []
            })
        })
        .then(res => res.json())
        .then((data) => {
            setUsers([...users, data])
            setCurrentUser(data.name)
            setWatchlist(data.watchlist)
            setCurrentId(data.id)
            setLoggedIn(data.loggedIn)
        })
    }

    function logOut() {
        fetch(`http://localhost:3000/users/${userId}`, {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "loggedIn": false
            })
        })
        .then(res => res.json())
        .then(data => {
            setCurrentId(0)
            setCurrentUser("")
            setWatchlist([])
            setLoggedIn(data.loggedIn)
        })
    }


    //filtering the cryptos when a search query is made

    let filteredCryptos = []
    if (query !== "") {
        allData.forEach(crypto => {
            if (crypto.name.toLowerCase().includes(query.toLowerCase()) || crypto.currency.includes(query.toUpperCase())) {
                filteredCryptos.push(crypto)
            }
        })
    }

    let watchArray = []
    watchlist.forEach(currency => {
        allData.forEach(coin => {
            if (coin.currency === currency) {
                watchArray.push(coin)
            }
        })   
    })

    if (isLoggedIn) {
        watchArray.sort((a,b) => a.rank - b.rank)
    }

    let cryptoArray = cryptoData.map(crypto => <Cryptos watchlist={watchlist} key={crypto.id} {...crypto} addToWatchList={addToWatchList}/>)

    let filteredCryptosWithComponents = filteredCryptos.slice(0,50).map(crypto => <Cryptos watchlist={watchlist} key={crypto.id} {...crypto} addToWatchList={addToWatchList}/>)

    let displayedCryptos = query !== "" ? filteredCryptosWithComponents : cryptoArray
        return(
            <div>
                <Header isLoggedIn={isLoggedIn} setQuery={setQuery} users={users} setCurrentUser={setCurrentUser} addSetUser={addSetUser} setLoggedIn={setLoggedIn} logOut={logOut} currentUser={currentUser} setPageNumber={setPageNumber}/>
                <br></br>
                {pageNumber > 1 || query !== "" || userId === 0 ? null :(<WatchContainer user={currentUser} watchArray={watchArray} deleteFromWatchlist={deleteFromWatchlist}/>)}
                <br></br>
                <CryptoTable cryptoArray={displayedCryptos} handlePageNumber={handlePageNumber} pageNumber={pageNumber} query={query}/>
                <br></br>
                <a href="https://nomics.com/">Crypto Market Cap And Pricing Data Provided By Nomics.</a>
            </div>
        )
}

export default CryptoContainer