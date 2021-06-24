import React  from "react";
import {Table} from "react-bootstrap/";
function CryptoTable(props) {
    const {pageNumber, handlePageNumber, cryptoArray} = props
    return (
        <div>
            <h2>All Coins</h2>
            <Table striped bordered hover variant="dark" >
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
                {cryptoArray}
            </tbody>
            </Table>
            {pageNumber === 1 ? null: (<button value="previous" onClick={e=>handlePageNumber(e)}>Previous Page</button>)}
            <button value="next" onClick={e=>handlePageNumber(e)}>Next Page</button>
        </div>
    )
}

export default CryptoTable;