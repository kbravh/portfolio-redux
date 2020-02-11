import React from "react"
import { graphql, Link } from "gatsby"

import './blog.css'

export default ({ data }) => {
  return (
    <>
      <h1>
        {data.allMarkdownRemark.totalCount}{" "}
        {data.allMarkdownRemark.totalCount === 1 ? "Post" : "Posts"}
      </h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={`blog/` + node.frontmatter.slug} className="blog-link" key={node.id}>
          <div className="blog-card">
            <h2>{node.frontmatter.title}</h2>
            <h4>{node.frontmatter.date}</h4>
            <p>{node.excerpt}</p>
          </div>
        </Link>
      ))}
    </>
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
            date(formatString: "DD MMMM, YYYY")
            slug
          }
          excerpt
        }
      }
    }
  }
`