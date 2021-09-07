import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/HomePage/Home';
import NewsDetails from './Components/NewsDetails/NewsDetails';
import LogIn from './Components/Login/LogIn';
import MakeAdmin from './Components/MakeAdmin/MakeAdmin';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const userContext = createContext()

export default function App() {
  const [logedInUser, setLogedInUser] = useState({})
  return (
    <userContext.Provider value = {[logedInUser, setLogedInUser]}  >
      <Router>
        <Switch>
        <Route path='/home'>
            <Home />
          </Route>
          
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          
          <PrivateRoute path='/news/:id'>
            <NewsDetails />
          </PrivateRoute>
          
          <Route path='/login'>
            <LogIn />
          </Route>
          
          <Route path='/make-admin'>
            <MakeAdmin />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='*'>
            page not found!!..
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}
