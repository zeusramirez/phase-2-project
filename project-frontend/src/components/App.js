import CryptoContainer from './CryptoContainer';
import CryptoDetails from './CryptoDetails';
import {Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Switch>
      <Route exact path="/" component={CryptoContainer}/>
      <Route path="/details/:id" component={CryptoDetails}/>
    </Switch>
  );
}

export default App;
