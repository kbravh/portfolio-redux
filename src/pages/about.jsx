import React from "react"
import { graphql, Link } from 'gatsby'
import { Helmet } from "react-helmet"

import Resume from '../assets/Karey_Higuera_Resume.pdf'

export default ({ data }) => {
  const site = data.site.siteMetadata

  return (
    <>
      <Helmet title="Writing - Karey Higuera" defer={false}>
        <meta name="author" content="Karey Higuera" />
        <meta property="og:url" content={`${site.siteUrl}/writing`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Writing - Karey Higuera" />
        <meta
          property="og:description"
          content="Technical guides for web and full-stack development."
        />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
      </Helmet>
      <h1>About Me</h1>
      <p>I'm a full-stack developer based out of northern Louisiana. I'm currently employed at <a href="https://pillar.hr">Pillar</a>, an interview intelligence platform. In the past 10 years I've lived here, Baltimore, Maryland, and in the northern provinces of Argentina. I'm fluent in English and Spanish.</p>
      <p>I don't have a lot of free time with our baby (less than a year old!), but I do enjoy reading and my new hobby, stamp collecting. Feel free to check out my <Link to='/reading-list'>reading list for 2022</Link>!</p>

      <p>Grab a copy of my <a href={Resume} download>resume</a>.</p>
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
