import React from 'react'
import WatchList from './WatchList'

function WatchContainer(props) {
const {user} = props
 let trackedCryptos = props.watchArray.map(crypto => <WatchList key={crypto.id} {...crypto} deleteFromWatchlist={props.deleteFromWatchlist}/>)

 //let listOwner = `${props.user}'s`

    return(
        <div>
            <h2>{user === "" ? null: (`${user}'s`)} Watchlisted Coins</h2>
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <th>Rank #</th>
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