import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet";

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <div>
      <Helmet defer={false}>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.frontmatter.banner.publicURL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
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
        banner {
          publicURL
        }
      }
    }
  }
`
