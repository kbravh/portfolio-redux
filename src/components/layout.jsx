import React from 'react'
import Transition from './transition'
import Header from './header'

const Layout = ({ children, location }) => {
  return (
    <>
      <Header />
      <Transition location={location}>{children}</Transition>
    </>
  )
}

export default Layout