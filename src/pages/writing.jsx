import React from "react"
import { graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import {Helmet} from 'react-helmet'

import './writing.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  return (
    <>
      <Helmet defer={false}>
        <title>Writing - Karey Higuera</title>
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
      <h1>Writing</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={`/writing/` + node.frontmatter.slug} className="writing-link" key={node.id}>
          <WritingCard post={node} />
        </Link>
      ))}
    </>
  )
}

const WritingCard = ({ post }) => {
  return (
    <article className="writing-card">
      <Img fluid={post.frontmatter.banner.childImageSharp.fluid} objectFit="cover" />
      <div className="writing-card-info">
        <h2 className="writing-card-title">{post.frontmatter.title}</h2>
        <h4 className="writing-card-date">{post.frontmatter.date}</h4>
        {/* when I add tags, i'll swap the order to date, title, tags */}
      </div>
    </article>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            banner {
              childImageSharp {
                fluid(quality:90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            date(formatString: "DD MMMM, YYYY")
            slug
            description
          }
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