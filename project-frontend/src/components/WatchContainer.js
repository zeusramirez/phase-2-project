import React from 'react'
import WatchList from './WatchList'

function WatchContainer(props) {
console.log(props.trackedCryptos)

 let trackedCryptos = props.trackedCryptos.map(crypto => <WatchList key={crypto.id} {...crypto}/>)

    return(
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>1D Change</th>
                        <th>Market Cap</th>
                        <th>Volume</th>
                        <th></th>
                    </tr>
                    {trackedCryptos}
                </tbody>
            </table>
    )
}

export default WatchContainer