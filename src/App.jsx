import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './Navbar'
import Users from './Users'
import UserCreate from './UserCreate'
import UserUpdate from './UserUpdate'
import LoginPage from './LoginPage.jsx'
import RegisterPage from './register'
import HomePage from './HomePage.jsx'


export default function App() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route exact path="/register" component={ RegisterPage } />
            <Route exact path="/HomePage" component={ HomePage } />
            <Route exact path='/create' component={UserCreate} />
            <Route exact path='/update/:id' component={UserUpdate} />
          </Switch>
        </div>
      </Router>
    );
  }

