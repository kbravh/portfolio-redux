import React from "react"
import { graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout";

import './blog.css'

export default ({ data }) => {
  return (
    <Layout>
      <h1>Blog</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={`blog/` + node.frontmatter.slug} className="blog-link" key={node.id}>
          <BlogCard post={node} />
        </Link>
      ))}
    </Layout>
  )
}

const BlogCard = ({ post }) => {
  return (
    <article className="blog-card">
      <Img fluid={post.frontmatter.banner.childImageSharp.fluid} objectFit="cover" />
      <div className="blog-card-info">
        <h2 className="blog-card-title">{post.frontmatter.title}</h2>
        <h4>{post.frontmatter.date}</h4>
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
  }
`
