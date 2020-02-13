import React from 'react'
import { Link } from 'gatsby'

import '../css/header.css'

import Resume from '../assets/Karey_Higuera_Resume.pdf'

const Header = () => (
  <nav>
    <div className="navlinks">
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/about">About</Link>
      <a className="resume-link" download href={Resume}>Resume</a>
    </div>
  </nav>
)

export default Header