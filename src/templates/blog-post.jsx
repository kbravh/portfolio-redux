import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image";
import { Helmet } from "react-helmet";
import Header from '../components/header'

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

      <Header />
      <header>
        <div className="blog-banner">
          <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
          <h1>{post.frontmatter.title}</h1>
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
