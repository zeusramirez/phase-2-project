import React from "react";
import { Link } from 'react-router-dom'
import {Button} from "react-bootstrap/";


function WatchList(props) {

    const {rank, currency, name, price, logo_url, market_cap, deleteFromWatchlist, id } = props

    let priceNum = parseFloat(price).toLocaleString('en-ENGL', { style: 'currency', currency: 'USD' })
    let dayChange = 0
    let redGreen = 'red'
    let volume = 0
    let marketCap = 0
    
    
    if (props["1d"] !== undefined || null) {
        dayChange = parseFloat(props["1d"].price_change_pct * 100).toFixed(2)
        if (dayChange > 0) redGreen = 'lightgreen'
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
       
        : number.toLocaleString('en-ENGL', { style: 'currency', currency: 'USD' })
    
    }


    return(
    <tr>
        <td><span>{rank}</span></td>
        <td><img style={{width:"30px", height:"30px"}}src={logo_url === "" ? "https://www.houseofcharity.org/wp-content/uploads/2019/07/White-Square.jpg": logo_url} alt={name}/> <span style={{fontWeight: "bold"}}><Link to={`/details/${id}`}>{name}</Link></span> <span>{currency}</span></td>
        <td>{priceNum}</td>
        <td><p style={{color: redGreen}}>{dayChange}%</p></td>
        <td><p>${marketCap}</p></td>
        <td><p>{volume}</p></td>
        <td><Button variant="danger" onClick={() => deleteFromWatchlist(id)}>Remove from WatchList</Button></td>
    </tr>
    )
}
export default WatchList