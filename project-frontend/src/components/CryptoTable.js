import React  from "react";
import {Table, Button } from "react-bootstrap/";
function CryptoTable(props) {
    const {pageNumber, handlePageNumber, cryptoArray, query} = props
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
            {query.length > 0 ? null: (<>{pageNumber === 1 ? null:(<Button variant="secondary" size="sm" value="previous" onClick={e=>handlePageNumber(e)}>Previous Page</Button >)} <Button variant="secondary" size="sm" value="next" onClick={e=>handlePageNumber(e)}>Next Page</Button ></>)}
        </div>
    )
}

export default CryptoTable;