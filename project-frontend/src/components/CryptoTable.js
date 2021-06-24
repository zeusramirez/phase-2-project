import React  from "react";

function CryptoTable(props) {
    const {pageNumber, handlePageNumber, cryptoArray} = props
    return (
        <div>
            <h2>All Coins</h2>
            <table style={{width:"100%"}}>
            <tbody>
                <tr>
                    <th>Rank #</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>1D Change</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                    <th></th>
                </tr>
                {cryptoArray}
            </tbody>
            </table>
            {pageNumber === 1 ? null: (<button value="previous" onClick={e=>handlePageNumber(e)}>Previous Page</button>)}
            <button value="next" onClick={e=>handlePageNumber(e)}>Next Page</button>
        </div>
    )
}

export default CryptoTable;