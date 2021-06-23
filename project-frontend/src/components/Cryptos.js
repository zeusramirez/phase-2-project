import React from 'react'
import {Link} from 'react-router-dom'

function Cryptos(props) {
    const {rank, currency, name, price, logo_url, market_cap, addToWatchList, id } = props

    return (
       <tr>
           <td>{rank}</td>
           <td><img style={{width:"30px", height:"30px"}}src={logo_url} alt={name}/> <span style={{fontWeight: "bold"}}><Link to={`/details/${id}`}>{name}</Link></span> {currency}</td>
           <td>{price}</td>
           <td>{props["1d"].price_change_pct * 100}%</td>
           <td>{market_cap}</td>
           <td>{props["1d"].volume}</td>
           <td><button onClick={() => addToWatchList(currency)}>Add to WatchList</button></td>
       </tr>
    )
}

export default Cryptos