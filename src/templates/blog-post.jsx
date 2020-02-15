import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image";
import { Helmet } from "react-helmet";

import '../css/blog-post.css'

export default ({ data }) => {
  const post = data.markdownRemark
  const site = data.site.siteMetadata
  return (
    <>
      <Helmet defer={false}>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.description || post.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kbravh" />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content={`${site.siteUrl}/blog/${post.frontmatter.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.description || post.excerpt} />
        <meta property="og:image" content={post.frontmatter.banner.publicURL} />
        <meta property="og:locale" content={post.frontmatter.language} />
      </Helmet>

      <header>
        <div className="blog-banner">
          <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
          <div className="blog-banner-details">
            <div className="blog-banner-header">
              <Link to="/">Home</Link>
              <Link to="/blog">Blog</Link>
            </div>
            <h1>{post.frontmatter.title}</h1>
            <div className="blog-banner-footer">
              <h4>{post.frontmatter.date}</h4>
            </div>
          </div>
        </div>
      </header>

      <section dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        slug
        language
        banner {
          childImageSharp {
            fluid(maxWidth: 700, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
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
