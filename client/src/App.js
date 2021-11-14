import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Respond from './pages/Respond'
import Summary from './pages/Summary'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const[isAutheticated] = useState(localStorage.token ? true : false)
  // const [sideNavExpanded, setSideNavExpanded] = useState(false);

  const contentStyle = {
    // marginLeft: sideNavExpanded ? "150px" : "2px", // arbitrary values
    transition: "margin 0.2s ease"
};

  return (
    <div className="App">
  <Router>
      <Navbar/>
        <Switch>
          <div style={contentStyle}>
          <PrivateRoute exact path="/" component={Home} auth={isAutheticated}/>
          <PrivateRoute path="/survey/:id" component={Survey} auth={isAutheticated}/>
          <Route path="/login" component={Login} />
          <Route path="/summary/:id" component={Summary} />
          <Route path="/respond/:id" component={Respond} />
          {/* <Route path="/register" component={Register} /> */}</div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
