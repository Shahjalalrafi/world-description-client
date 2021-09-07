import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/HomePage/Home';
import NewsDetails from './Components/NewsDetails/NewsDetails';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


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
          
          <Route path='/news/:id'>
            <NewsDetails />
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
