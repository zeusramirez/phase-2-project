import React from 'react'
import WatchList from './WatchList'

function WatchContainer(props) {
console.log(props.trackedCryptos)

 let trackedCryptos = props.trackedCryptos.map(crypto => <WatchList key={crypto.id} {...crypto} deleteFromWatchlist={props.deleteFromWatchlist}/>)

    return(
        <div>
            <h2>Watchlisted Coins</h2>
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>1D Change</th>
                        <th>Market Cap</th>
                        <th>Volume</th>
                    </tr>
                    {trackedCryptos}
                </tbody>
            </table>
        </div>
    )
}

export default WatchContainer