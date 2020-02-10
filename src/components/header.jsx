import React from 'react'
import { Link } from 'gatsby'

import '../css/header.css'

const Header = () => (
  <nav>
    <div className="logo">Kbravh</div>
    <div className="navlinks">
      <Link to="/">Home</Link>
      <Link to="/writing">Writing</Link>
    </div>
  </nav>
)

export default Header