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
      <h1>Writing</h1>
      <section className="writing-cards">
        {data.allMdx.edges.map(({ node }) => (
          <Link to={`/writing/` + node.frontmatter.slug} className="writing-link" key={node.id}>
            <WritingCard post={node} />
          </Link>
        ))}
      </section>
    </>
  )
}

const WritingCard = ({ post }) => {
  return (
    <article className="writing-card">
      <Img fluid={post.frontmatter.banner.childImageSharp.fluid} objectFit="cover" />
      <div className="writing-card-info">
        <h4 className="writing-card-date">{post.frontmatter.date}</h4>
        <h2 className="writing-card-title">{post.frontmatter.title}</h2>
        <h4 className="writing-card-tags">{commaSeparatedList(post.frontmatter.tags)}</h4>
      </div>
    </article>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: {source: {eq: "writing"}}}
    ) {
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
            tags
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
