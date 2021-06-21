
import React, {useEffect, useState} from 'react'
import WatchContainer from './WatchContainer'
import CryptoTable from './CryptoTable'
import Cryptos from './Cryptos'

const key = "3548273706736fa15fcc08e8983e328278635ca6"

function CryptoContainer() {
let [pageNumber, setPageNumber] = useState(1)
let [cryptoData, setData] = useState([])
let [trackedCryptos, setTracked] = useState([])

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

let cryptoArray = cryptoData.map(crypto => <Cryptos key={crypto.id} {...crypto} addToWatchList={addToWatchList}/>)

function addToWatchList(props) {
    fetch("http://localhost:3001/cryptos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(props)
    })
    .then(res => res.json())
    .then(data => setTracked([...trackedCryptos, data]))
}

    return(
        <div>
            <h1 style={{textDecorationLine: "underline"}}>Coin Tracker</h1>
            <WatchContainer trackedCryptos={trackedCryptos}/>
            <CryptoTable cryptoArray={cryptoArray} handlePageNumber={handlePageNumber} pageNumber={pageNumber}/>
        </div>
    )
}

export default CryptoContainer