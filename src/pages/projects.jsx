import React from "react"
import { graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import { commaSeparatedList } from '../util'

import './writing.css'

export default ({ data }) => {
    const site = data.site.siteMetadata
    return (
        <>
            <Helmet title="Writing - Karey Higuera" defer={false}>
                <meta name="author" content="Karey Higuera" />
                <meta property="og:url" content={`${site.siteUrl}/writing`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Writing - Karey Higuera" />
                <meta property="og:description" content="Technical guides for web and full-stack development." />
                <meta property="og:image" content="" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="" />
                <meta name="twitter:author" content="@kbravh" />
            </Helmet>
            <h1>Projects</h1>
            <section className="writing-cards">
                {data.allMdx.nodes.map(node => (
                    <Link to={`/projects/` + node.frontmatter.slug} className="writing-link" key={node.id}>
                        {node.frontmatter.title} - {node.frontmatter.date}
                    </Link>
                ))}
            </section>
        </>
    )
}

export const query = graphql`
  query {
    allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {fields: {source: {eq: "projects"}}}
    ) {
      totalCount
        nodes {
            id
            frontmatter {
                title
                date(formatString: "YYYY")
                slug
                description
                link
                github
                tags
            }
        }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
