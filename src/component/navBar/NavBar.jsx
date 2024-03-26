import React from 'react'
import {  Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
<ul className="App-header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/meetHostBuddy">Meet HostBuddy</Link>
          </li>
        </ul>    </div>
  )
}

export default NavBar
