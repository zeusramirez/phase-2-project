import React from "react";
function WatchList(props) {

    const {rank, currency, name, price, logo_url, market_cap, addToWatchList } = props

    return(
    <tr>
        <td>{rank}</td>
        <td><img style={{width:"30px", height:"30px"}}src={logo_url} alt={name}/> <span style={{fontWeight: "bold"}}>{name}</span> {currency}</td>
        <td>{price}</td>
        <td>{props["1d"].price_change_pct * 100}%</td>
        <td>{market_cap}</td>
        <td>{props["1d"].volume}</td>
        <td><button onClick={() => addToWatchList(props)}>Add to WatchList</button></td>
    </tr>
    )
}
export default WatchList