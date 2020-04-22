import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image";
import { Helmet } from "react-helmet";

import '../css/writing-post.css'

export default ({ data }) => {
  const post = data.markdownRemark
  const site = data.site.siteMetadata
  return (
    <>
      <Helmet title={post.frontmatter.title} defer={false}>
        <meta name="description" content={post.frontmatter.description || post.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kbravh" />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content={`${site.siteUrl}/writing/${post.frontmatter.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.description || post.excerpt} />
        <meta property="og:image" content={post.frontmatter.banner.publicURL} />
        <meta property="og:locale" content={post.frontmatter.language} />
      </Helmet>

      <header>
        <div className="writing-banner">
          <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
          <div className="writing-banner-details">
            <div className="writing-banner-header">
              <Link to="/">Home</Link>
              <Link to="/writing">Writing</Link>
            </div>
            <h1>{post.frontmatter.title}</h1>
            <div className="writing-banner-footer">
              <h4>{post.frontmatter.date}</h4>
            </div>
          </div>
        </div>
      </header>

      <section className="blog-section" dangerouslySetInnerHTML={{ __html: post.html }} />
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
        description
        slug
        language
        banner {
          publicURL
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
