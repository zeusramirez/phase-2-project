import React from 'react'
import WatchList from './WatchList'
import {Table} from "react-bootstrap/";

function WatchContainer(props) {
    const {user} = props
    let trackedCryptos = props.watchArray.map(crypto => <WatchList key={crypto.id} {...crypto} deleteFromWatchlist={props.deleteFromWatchlist}/>)

    //let listOwner = `${props.user}'s`

    return(
        <div>
            <h2 style={{textAlign:"center"}}>{user === "" ? null: (`${user}'s`)} Watchlisted Coins</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Rank #</th>
                        <th size="md">Name</th>
                        <th>Price</th>
                        <th>1D Change</th>
                        <th>Market Cap</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {trackedCryptos}
                </tbody>
            </Table>
        </div>
    )
}

export default WatchContainer