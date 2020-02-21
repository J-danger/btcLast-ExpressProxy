import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './components/Main'
import Clock from './components/Clock';


function App() {
  return (
    <div className="App">
      <Main/>
      <Clock/>
    </div>
  );
}

export default App;
