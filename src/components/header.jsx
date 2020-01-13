import React from 'react'
import {Link} from 'gatsby'

const Header = () => (
  <nav>
    <div>Kbravh</div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/writing">Writing</Link></li>
    </ul>
  </nav>
)

export default Header