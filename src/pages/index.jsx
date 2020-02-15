import React from "react"
import {Helmet} from 'react-helmet'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const site = data.site.siteMetadata
  return (
    <Layout>
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
      <p>I'm a full stack developer passionate about modern web technologies. I work with JavaScript and React on the front-end and Node.js in cloud services on the backend. I enjoy utilizing serverless functionality to make the web a simpler, more maintainable space.</p>
    </Layout>
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
