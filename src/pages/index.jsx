import React from "react"
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Icon from '../components/icon'

import useWindowSize from '../hooks/useWindowSize'

export default ({ data }) => {
  const site = data.site.siteMetadata

  const { width } = useWindowSize()

  return (
    <>
      <Helmet defer={false}>
        <title>Karey Higuera - Online Portfolio</title>
        <meta name="author" content="Karey Higuera" />
        <meta property="og:url" content={site.siteUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Karey Higuera" />
        <meta property="og:description" content="Online portfolio for Karey Higuera, full-stack developer." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
      </Helmet>
      <h1>Karey Higuera</h1>
      <h2>Full-stack developer</h2>
      <p>I'm a self-taught, full-stack developer passionate about modern web technologies. I work with JavaScript and React on the front-end and Node.js in cloud services on the backend. I enjoy utilizing serverless functionality to make the web a simpler, more maintainable space.</p>
      {width < 600 &&
        <>
          <p style={{textAlign: "center"}}>Find me around the web!</p>
          <div className="social-links">
            <a href="https://github.com/kbravh" alt="GitHub"><Icon icon="github" /></a>
            <a href="https://www.linkedin.com/in/kbravh/" alt="LinkedIn"><Icon icon="linkedin" /></a>
            <a href="https://codepen.io/kbravh" alt="CodePen"><Icon icon="codepen" /></a>
            <a href="https://twitter.com/kbravh" alt="Twitter" s><Icon icon="twitter" /></a>
          </div>
        </>
      }
    </>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
