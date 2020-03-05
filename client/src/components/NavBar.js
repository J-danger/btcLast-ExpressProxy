// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import User from './User'
import './NavBar.css'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className='loginSection'>
      {!isAuthenticated && (
        <button className='loginButton' onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button className='loginButton' onClick={() => logout()}>Log out</button>}
      <div className='userName'>
        <User/>
      </div>
    </div>
    
  );
};

export default NavBar;