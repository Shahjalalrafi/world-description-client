import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/HomePage/Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


export default function App() {
  return (
    <div >
      <Router>
        <Switch>
        <Route path='/home'>
            <Home />
          </Route>
          
          <Route path='/dashboard'>
            <Dashboard />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='*'>
            page not found!!..
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
