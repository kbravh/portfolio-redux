import React, { useState } from 'react'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import Icon from './icon'
import useWindowSize from '../hooks/useWindowSize'
import useHasMounted from '../hooks/useHasMounted'

import '../css/header.css'

const menuAnimations = {
  open: { y: "-30%" },
  closed: { y: "-85%", transition: {delay: 0.2} }
}

const listAnimations = {
  open: {
    transition: { staggerChildren: 0.07 },
    visibility: "visible"
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" },
    visibility: "hidden" // this makes sure the list items are not focusable when the menu is closed
  }
}

const listItemAnimations = {
  open: {
    x: "0%",
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    },
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    },
  }
}

const Header = () => {
  let { width } = useWindowSize()
  const [isMenuOpen, setMenuOpen] = useState(false)

  // we're using this to avoid issues with rehydration
  // (see https://joshwcomeau.com/react/the-perils-of-rehydration/)
  const hasMounted = useHasMounted()

  if(!hasMounted){
    return null
  } else if (width < 600) {
    return (
      <>
        <motion.nav className="mobile-menu"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuAnimations}
        >
          <button className="menu-button button" onClick={() => setMenuOpen(!isMenuOpen)}>
            Menu
            {isMenuOpen ? <Icon icon="chevrons-up"/> : <Icon icon="chevrons-down" />}
          </button>
          <motion.ul className="navlinks"
            variants={listAnimations}
          >
            <motion.li variants={listItemAnimations}><Link to="/" onClick={() => setMenuOpen(false)}><Icon icon="home" />Home</Link></motion.li>
            <motion.li variants={listItemAnimations}><Link to='/projects' onClick={() => setMenuOpen(false)}><Icon icon="wrench" />Projects</Link></motion.li>
            <motion.li variants={listItemAnimations}><Link to="/writing" onClick={() => setMenuOpen(false)}><Icon icon="pen" />Writing</Link></motion.li>
            <motion.li variants={listItemAnimations}><Link to="/about" onClick={() => setMenuOpen(false)}><Icon icon="person" />About</Link></motion.li>
          </motion.ul>
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
          <Link to="/about">About</Link>
        </div>
      </nav>
    )
  }
}

export default Header
