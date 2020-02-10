import React from 'react'
// import Transition from './transition'
import Header from './header'

import '../css/layout.css'

const Layout = ({ children, location }) => {
  return (
    <>
      <Header />
      <div className="layout">
        {/* <Transition location={location}>{children}</Transition> */}
        {children}
      </div>
    </>
  )
}

export default Layout