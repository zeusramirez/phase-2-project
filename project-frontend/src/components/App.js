import CryptoContainer from './CryptoContainer';
import CryptoDetails from './CryptoDetails';
import {Route, Switch} from 'react-router-dom'
import { useState } from 'react'


function App() {

  let [isLoggedIn, setLoggedIn] = useState(false)
  let [currentUser, setCurrentUser] = useState("")
  console.log(currentUser, isLoggedIn)

  return (
    <Switch>
      <Route exact path="/" render={() => <CryptoContainer isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
      <Route path="/details/:id" render={() => <CryptoDetails isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
    </Switch>
  );
}

export default App;
