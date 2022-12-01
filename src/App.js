import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Navbar from './components/layout/Navbar/Navbar.js';
import SearchPage from './components/pages/SearchPage/SearchPage.js';
import Reservations from './components/pages/Reservations/Reservations.js';
import Favorites from './components/pages/Favorites/Favorites.js';
import HouseDetails from './components/pages/HouseDetails/HouseDetails.js';
import {ProviderFavorites} from './providers/FavoritesContext.js'

import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

function App() {
  return <ProviderFavorites>
      <BrowserRouter>
          <div className="App container">
              <Switch>
                  <Route path="/casas/:house_id" component={HouseDetails}/>
                  <Route path="/casas" component={SearchPage}/>
                  <Route path="/reservas" component={Reservations}/>
                  <Route path="/favoritos" component={Favorites}/>
                  <Redirect to={"/reservas"}/>
              </Switch>
              <Navbar/>
          </div>
      </BrowserRouter>
  </ProviderFavorites>;
}

export default App;