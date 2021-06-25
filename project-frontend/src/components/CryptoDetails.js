import React, { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import NavBar from './NavBar'
// import { useHistory } from 'react-router-dom'
const apiKey = process.env.REACT_APP_KEY

function CryptoDetails(props) {
    const {isLoggedIn, currentUser, setLoggedIn, setCurrentUser}=props

    const [widget, setWidget] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    
    const id = useParams().id
    //console.log(id)
    
    useEffect(() => {
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=${id}`)
        .then(res => res.json())
        .then(data => {
            setWidget(data)
            setIsUpdated(isUpdated => !isUpdated)
        })
    }, [id])

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            // setUsers(data)
            data.forEach(user => {
                if (user.loggedIn) {
                    setCurrentUser(user.name)
                    // setCurrentId(user.id)
                    // setWatchlist(user.watchlist)
                    setLoggedIn(user.loggedIn)
                }
            })
        })
    },[])
    //debugger

    if (!isUpdated) return <h2>Loading...</h2>;

    let name = widget[0].name
    let currency = widget[0].currency
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <h1 className="detailsHeader">{name} Details</h1>
            <div className="nomics-ticker-widget" data-name={name} data-base={currency} data-quote="USD"></div>
            <Helmet>
                <script src="https://widget.nomics.com/embed.js"></script>
            </Helmet>
        </div>
    )
    
}

export default CryptoDetails