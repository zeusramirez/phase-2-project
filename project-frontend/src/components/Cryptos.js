import React from 'react'
import {Link} from 'react-router-dom'

function Cryptos(props) {
    const {rank, currency, name, price, logo_url, market_cap, addToWatchList, id } = props

    let priceNum = parseFloat(price)
    let dayChange = parseFloat(props["1d"].price_change_pct * 100)
    let marketCap = parseFloat(market_cap)
    let volume = parseFloat(props["1d"].volume)

    function numberAbbreviation (number) {

        // Nine Zeroes for Billions
        return Math.abs(number) >= 1.0e+9
    
        ? (Math.abs(number ) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(number) >= 1.0e+6
    
        ? (Math.abs(number) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(number) >= 1.0e+3
    
    }

    

    return (
       <tr>
           <td>{rank}</td>
           <td><img style={{width:"30px", height:"30px"}}src={logo_url} alt={name}/> <span style={{fontWeight: "bold"}}><Link to={`/details/${id}`}>{name}</Link></span> {currency}</td>
           <td>${priceNum.toFixed(2)}</td>
           <td>{dayChange.toFixed(2)}%</td>
           <td>${numberAbbreviation(marketCap)}</td>
           <td>${numberAbbreviation(volume)}</td>
           <td><button onClick={() => addToWatchList(currency)}>Add to WatchList</button></td>
       </tr>
    )
}

export default Cryptos