import React, { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom'
import {Helmet} from 'react-helmet'
// import { useHistory } from 'react-router-dom'

const key = "API KEYE HERE"

function CryptoDetails() {

    const [widget, setWidget] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    
    const id = useParams().id
    //console.log(id)
    
    useEffect(() => {
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=${id}`)
        .then(res => res.json())
        .then(data => {
            setWidget(data)
            setIsUpdated(!isUpdated)
        })
    }, [id])
    //debugger

    if (!isUpdated) return <h2>Loading...</h2>;

    let name = widget[0].name
    let currency = widget[0].currency
    return (
        <div>
            <h1> {name} Details</h1>
            <div className="nomics-ticker-widget" data-name={name} data-base={currency} data-quote="USD"></div>
            <Helmet>
                <script src="https://widget.nomics.com/embed.js"></script>
            </Helmet>
        </div>
    )
    
}

export default CryptoDetails