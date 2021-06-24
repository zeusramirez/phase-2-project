import React from 'react'
import {Link} from 'react-router-dom'
// import WatchList from './WatchList'

function Cryptos(props) {

    let {rank, currency, name, price, logo_url, market_cap, addToWatchList, id, watchlist } = props

    let priceNum = parseFloat(price).toLocaleString('en-ENGL', { style: 'currency', currency: 'USD' })
    let dayChange = 0
    let volume = 0
    let marketCap = 0
    
    
    if (props["1d"] !== undefined || null) {
        dayChange = parseFloat(props["1d"].price_change_pct * 100).toFixed(2)
        volume = numberAbbreviation(parseFloat(props["1d"].volume))
    }

    if (market_cap !== undefined) {
        marketCap = numberAbbreviation(parseFloat(market_cap).toFixed(2))
    }

    function numberAbbreviation (number) {
        // Nine Zeroes for Billions
        return Math.abs(number) >= 1.0e+9
    
        ? `$${(Math.abs(number ) / 1.0e+9).toFixed(2)}B`
        // Six Zeroes for Millions 
        : Math.abs(number) >= 1.0e+6
    
        ? `$${(Math.abs(number) / 1.0e+6).toFixed(2)}M`

        : Math.abs(number) >= 1.0e+3

        ? `$${(Math.abs(number) / 1.0e+3).toFixed(2)}K`
       
        : number.toLocaleString('en-ENGL', { style: 'currency', currency: 'USD' })
    
    }

    // {status === "inactive" ? }

    return (
       <tr>
           <td><span>{rank}</span></td>
           <td><img style={{width:"30px", height:"30px"}}src={logo_url === "" ? "https://www.houseofcharity.org/wp-content/uploads/2019/07/White-Square.jpg": logo_url} alt={name}/> <span style={{fontWeight: "bold"}}><Link to={`/details/${id}`}>{name}</Link></span> <span>{currency}</span></td>
           <td>{priceNum}</td>
           <td><p>{dayChange}%</p></td>
           <td><p>${marketCap}</p></td>
           <td><p>{volume}</p></td>
           {watchlist.includes(currency) ? null:(<td><button onClick={() => addToWatchList(currency)}>Add to WatchList</button></td>)}
       </tr>
    )
}

export default Cryptos