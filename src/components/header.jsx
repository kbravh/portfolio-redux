import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import Icon from './icon'
import useWindowSize from '../hooks/useWindowSize'

import '../css/header.css'

import Resume from '../assets/Karey_Higuera_Resume.pdf'

const menuAnimations = {
  open: { y: "-30%" },
  closed: { y: "-85%", transition: {delay: 0.2} }
}

const listAnimations = {
  open: {
    transition: { staggerChildren: 0.07 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const listItemAnimations = {
  open: {
    x: "0%",
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

const Header = () => {
  let { width } = useWindowSize()
  const [isMenuOpen, setMenuOpen] = useState(false)

  // we're using this to avoid issues with rehydration 
  // (see https://joshwcomeau.com/react/the-perils-of-rehydration/)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if(!hasMounted){
    return null
  } else if (width < 600) {
    return (
      <>
        <motion.nav className="mobile-menu"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuAnimations}
        >
          <motion.ul className="navlinks"
            variants={listAnimations}
          >
            <motion.li variants={listItemAnimations}><Link to="/" onClick={() => setMenuOpen(false)}><Icon icon="home" />Home</Link></motion.li>
            <motion.li variants={listItemAnimations}><Link to='/projects' onClick={() => setMenuOpen(false)}><Icon icon="wrench" />Projects</Link></motion.li>
            <motion.li variants={listItemAnimations}><Link to="/writing" onClick={() => setMenuOpen(false)}><Icon icon="pen" />Writing</Link></motion.li>
            <motion.li variants={listItemAnimations}><a download href={Resume} onClick={() => setMenuOpen(false)}><Icon icon="download" />Resume</a></motion.li>
          </motion.ul>
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