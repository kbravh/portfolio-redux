import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";

import './blog.css'

export default ({ data }) => {
  return (
    <Layout>
      <h1>Blog</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={`blog/` + node.frontmatter.slug} className="blog-link" key={node.id}>
          <div className="blog-card">
            <h2>{node.frontmatter.title}</h2>
            <h4>{node.frontmatter.date}</h4>
            <p>{node.frontmatter.description}</p>
          </div>
        </Link>
      ))}
    </Layout>
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
            description
          }
        }
      }
    }
  }
`
