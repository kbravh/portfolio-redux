import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import { commaSeparatedList } from '../util'
import Icon from '../components/icon'

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
        <div className="writing-card-info">
          <div className="writing-card-title">{post.frontmatter.title}</div>
          <div className="writing-card-tags">
            {commaSeparatedList(post.frontmatter.tags)}
          </div>
        </div>
        <Icon icon="arrow-right" />
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
