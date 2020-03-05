import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import Main from './components/Main'
import Clock from './components/Clock';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";


function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>wtf...</div>;
  }

  return (
    // <div className="App">
    //   <header>
    //     <NavBar />
    //     <Clock/>
    //     <Main/>
    //   </header>
    // </div>

    <div className="App">
    {/* Don't forget to include the history module */}
    <Router history={history}>
      <header>
        <NavBar />
        {/* <Clock/> */}
        <Main/>
      </header>
      <Switch>
        <Route path="/" exact />
        {/* <Route path="/profile" component={Profile} /> */}
      </Switch>
    </Router>
    </div>
  );
}

export default App;