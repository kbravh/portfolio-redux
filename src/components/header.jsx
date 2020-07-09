import React from 'react'
import { Link } from 'gatsby'

import '../css/header.css'

import Resume from '../assets/Karey_Higuera_Resume.pdf'

const Header = () => (
  <nav>
    <div className="navlinks">
      <Link to="/">Home</Link>
      <Link to='/projects'>Projects</Link>
      <Link to="/writing">Writing</Link>
      <span>
        <a className="resume-link" download href={Resume}>Resume</a>
      </span>
    </div>
  </nav>
)

export default Header