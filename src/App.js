import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import CountriesGraphic from './components/CountriesGraphic';
import Home from './components/Home';
import {Navigation} from './components/Navbar';

import "bootswatch/dist/lux/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/countries" component={CountriesGraphic} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
