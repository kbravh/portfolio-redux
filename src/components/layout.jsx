import React from 'react'
import Header from './header'
import { Helmet } from "react-helmet";
import Icon from './icon'

import '../css/layout.css'

const Layout = ({ children }) => {
  return (
    <>
      <Helmet defer={false} htmlAttributes={{lang: 'en'}}>
        <title>Karey Higuera - Online Portfolio</title>
        <meta name="author" content="Karey Higuera" />
      </Helmet>
      <Header />
      <div className="layout-wrapper">
        <div className="left-sidebar">
          <ul className="logo-link-container">
            <li>
              <a href="https://github.com/kbravh" alt="GitHub" ariaLabel="GitHub">
                <Icon icon="github" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kbravh/" alt="LinkedIn" ariaLabel="LinkedIn">
                <Icon icon="linkedin" />
              </a>
            </li>
            <li>
              <a href="https://codepen.io/kbravh" alt="CodePen" ariaLabel="CodePen">
                <Icon icon="codepen" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/kbravh" alt="Twitter" ariaLabel="Twitter">
                <Icon icon="twitter" />
              </a>
            </li>
          </ul>
        </div>
        <div className="layout">
          {children}
        </div>
        <div className="right-sidebar">
          <div className="email-wrapper">
            <a href="mailto:karey.higuera@gmail.com">karey.higuera@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout