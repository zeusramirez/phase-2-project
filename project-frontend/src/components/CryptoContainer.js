import React, {useEffect, useState} from 'react'
import WatchContainer from './WatchContainer'
import CryptoTable from './CryptoTable'
import Cryptos from './Cryptos'
import Header from './Header'

const key = "3548273706736fa15fcc08e8983e328278635ca6"

function CryptoContainer() {
let [pageNumber, setPageNumber] = useState(1)
let [cryptoData, setData] = useState([])
let [trackedCryptos, setTracked] = useState([])
let [query, setQuery] = useState("")

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

function addToWatchList(props) {
    fetch("http://localhost:3000/cryptos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(props)
    })
    .then(res => res.json())
    .then(data => setTracked([...trackedCryptos, data]))
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


let filteredCryptos = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(query.toLowerCase()) || crypto.currency.includes(query.toUpperCase()))

let cryptoArray = filteredCryptos.map(crypto => <Cryptos key={crypto.id} {...crypto} addToWatchList={addToWatchList}/>)

    return(
        <div>
            <Header query={query} setQuery={setQuery}/>
            {pageNumber > 1 || query !== "" ? null:(<WatchContainer trackedCryptos={trackedCryptos} deleteFromWatchlist={deleteFromWatchlist}/>)}
            <CryptoTable cryptoArray={cryptoArray} handlePageNumber={handlePageNumber} pageNumber={pageNumber}/>
        </div>
    )
}

export default CryptoContainer