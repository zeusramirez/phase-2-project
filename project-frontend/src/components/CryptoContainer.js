import React, {useEffect, useState} from 'react'
import WatchContainer from './WatchContainer'
import CryptoTable from './CryptoTable'
import Cryptos from './Cryptos'
import Header from './Header'

const key = "API KEY GOES"

function CryptoContainer() {
let [pageNumber, setPageNumber] = useState(1)
let [cryptoData, setData] = useState([])
let [trackedCryptos, setTracked] = useState([])
let [query, setQuery] = useState("")
let [usernames, setUsernames] = useState([])
let [currentUser, setCurrentUser] = useState("")

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

    useEffect(()=> {
        fetch("http://localhost:3000/cryptos")
        .then(res => res.json())
        .then(data => setTracked(data))
    },[])

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            let justNames = data.map(user => user.name)
            setUsernames(justNames)
        })
    },[])

function addToWatchList(props) {
    fetch("http://localhost:3000/cryptos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(props)
    })
    .then(res => res.json())
    .then(data => setTracked([...trackedCryptos, data]))
    // .catch(() => console.log("uh oh"))
}

function deleteFromWatchlist(id) {
    fetch(`http://localhost:3000/cryptos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then (() => {
        let updatedWatchlist = trackedCryptos.filter(crypto => crypto.id !== id)
        setTracked(updatedWatchlist)
    })
}

function addUser(name) {
    if (usernames.includes(name)) console.log("user already Exists");
    else
    fetch("http://localhost:3000/users", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "name": name
        })
    })
    .then(res => res.json())
    .then(() => {
        setUsernames([...usernames, name])
    })
}

let filteredCryptos = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(query.toLowerCase()) || crypto.currency.includes(query.toUpperCase()))

let cryptoArray = filteredCryptos.map(crypto => <Cryptos key={crypto.id} {...crypto} addToWatchList={addToWatchList}/>)

    return(
        <div>
            <Header query={query} setQuery={setQuery} usernames={usernames} addUser={addUser} />
            {pageNumber > 1 || query !== "" ? null:(<WatchContainer trackedCryptos={trackedCryptos} deleteFromWatchlist={deleteFromWatchlist}/>)}
            <CryptoTable cryptoArray={cryptoArray} handlePageNumber={handlePageNumber} pageNumber={pageNumber}/>
            <br></br>
            <a href="https://nomics.com/">Crypto Market Cap And Pricing Data Provided By Nomics.</a>
        </div>
    )
}

export default CryptoContainer