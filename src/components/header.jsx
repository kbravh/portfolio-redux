import React, { useState } from 'react'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import Icon from './icon'
import useWindowSize from '../hooks/useWindowSize'

import '../css/header.css'

import Resume from '../assets/Karey_Higuera_Resume.pdf'

const variants = {
  open: { y: "-30%" },
  closed: { y: "-85%" }
}

const Header = () => {
  let { width } = useWindowSize()
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (width < 600) {
    return (
      <>
        <motion.nav className="mobile-menu"
          animate={isMenuOpen ? "open" : "closed"}
          variants={variants}
        >
          <ul className="navlinks">
            <li><Link to="/" onClick={() => setMenuOpen(false)}><Icon icon="home" />Home</Link></li>
            <li><Link to='/projects' onClick={() => setMenuOpen(false)}><Icon icon="wrench" />Projects</Link></li>
            <li><Link to="/writing" onClick={() => setMenuOpen(false)}><Icon icon="pen" />Writing</Link></li>
            <li><a download href={Resume} onClick={() => setMenuOpen(false)}><Icon icon="download" />Resume</a></li>
          </ul>
          <button className="menu-button button" onClick={() => setMenuOpen(!isMenuOpen)}>
            Menu
            {isMenuOpen ? <Icon icon="chevrons-up"/> : <Icon icon="chevrons-down" />}
          </button>
        </motion.nav>
      </>
    )
  } else {
    return (
      <nav className="desktop-menu">
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
  }
}

export default Header