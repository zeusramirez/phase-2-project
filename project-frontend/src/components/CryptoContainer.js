import React, {useEffect, useState} from 'react'
import WatchContainer from './WatchContainer'
import CryptoTable from './CryptoTable'
import Cryptos from './Cryptos'
import Header from './Header'

const key = "3548273706736fa15fcc08e8983e328278635ca6"

function CryptoContainer() {
let [pageNumber, setPageNumber] = useState(1)
// our array of Cryptos from the API
let [cryptoData, setData] = useState([])
let [query, setQuery] = useState("")
let [users, setUsers] = useState([])
let [currentUser, setCurrentUser] = useState("")
let [userId, setCurrentId] = useState(0)
let [watchlist, setWatchlist] = useState([])

    function handlePageNumber(e) {
        let value = e.target.value
        if (value === "next") {
        setPageNumber(pageNumber + 1)
        document.documentElement.scrollTop = 0;
        } else if (value=== "previous") {
            setPageNumber(pageNumber - 1)
            document.documentElement.scrollTop = 0;
        }
    }

    useEffect(()=> {
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=${key}&per-page=100&page=${pageNumber}`)
        .then(res => res.json())
        .then(data => setData(data))
    },[pageNumber])

    // useEffect(()=> {
    //     fetch("http://localhost:3000/user/{}")
    //     .then(res => res.json())
    //     .then(data => setTracked(data))
    // },[currentUser])

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            setUsers(data)
        })
    },[])

    
    function addToWatchList(currency) {
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
            setCurrentUser(name);
            users.map(user => {
                if (user.name === name) {
                    setWatchlist(user.watchlist)
                    setCurrentId(user.id)
                }
            })
        }
    else
    fetch("http://localhost:3000/users", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "name": name,
            "watchlist": []
        })
    })
    .then(res => res.json())
    .then((data) => {
        setUsers([...users, data.name])
        setCurrentUser(data.name)
        setWatchlist(data.watchlist)
        setCurrentId(data.id)
    })
}

console.log(currentUser)

//filtering the cryptos when a search query is made
let filteredCryptos = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(query.toLowerCase()) || crypto.currency.includes(query.toUpperCase()))


let watchArray = []
watchlist.forEach(currency => {
    cryptoData.forEach(coin => {
        if (coin.currency === currency) {
            watchArray.push(coin)
        }
    })   
})

console.log(watchArray)

let cryptoArray = filteredCryptos.map(crypto => <Cryptos key={crypto.id} {...crypto} addToWatchList={addToWatchList}/>)

    return(
        <div>
            <Header query={query} setQuery={setQuery} users={users} addSetUser={addSetUser} />
            {pageNumber > 1 || query !== "" ? null:(<WatchContainer user={currentUser} watchArray={watchArray} deleteFromWatchlist={deleteFromWatchlist}/>)}
            <CryptoTable cryptoArray={cryptoArray} handlePageNumber={handlePageNumber} pageNumber={pageNumber}/>
            <br></br>
            <a href="https://nomics.com/">Crypto Market Cap And Pricing Data Provided By Nomics.</a>
        </div>
    )
}

export default CryptoContainer