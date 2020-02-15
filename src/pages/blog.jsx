import React from "react"
import { graphql, Link } from "gatsby"
import Img from 'gatsby-image'
import {Helmet} from 'react-helmet'
import Layout from "../components/layout";

import './blog.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  return (
    <Layout>
      <Helmet defer={false}>
        <title>Blog - Karey Higuera</title>
        <meta name="author" content="Karey Higuera" />
        <meta property="og:url" content={`${site.siteUrl}/blog`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Blog - Karey Higuera" />
        <meta property="og:description" content="Technical guides for web and full-stack development." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
      </Helmet>
      <h1>Blog</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={`/blog/` + node.frontmatter.slug} className="blog-link" key={node.id}>
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
        <h4 className="blog-card-date">{post.frontmatter.date}</h4>
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
