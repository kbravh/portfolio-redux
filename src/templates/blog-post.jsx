import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet";

export default ({ data }) => {
  const post = data.markdownRemark
  const site = data.site.siteMetadata
  return (
    <div>
      <Helmet defer={false}>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kbravh" />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content={`${site.siteUrl}/blog/${post.frontmatter.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.description} />
        <meta property="og:image" content={post.frontmatter.banner.publicURL} />
        <meta property="og:locale" content={post.frontmatter.language} />
      </Helmet>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
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
          publicURL
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
