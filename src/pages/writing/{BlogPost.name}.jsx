import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {commaSeparatedList} from '../../util'
import Icon from '../../components/icon'

import '../../css/writing-post.css'

export default ({ data }) => {
  const post = data.blogPost
  const site = data.site.siteMetadata
  return (
    <>
      <Helmet title={post.frontmatter.title} defer={false}>
        <meta name="description" content={post.frontmatter.description || post.excerpt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kbravh" />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content={`${site.siteUrl}${post.gatsbyPath}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.description || post.excerpt} />
        {/* <meta property="og:image" content={`${site.siteUrl}${post.frontmatter.banner.publicURL}`} />
        <meta property="og:image:width" content="1050" />
        <meta property="og:image:height" content="700" /> */}
        <meta property="og:locale" content={post.frontmatter.language} />
      </Helmet>

      <header>
        <div className="writing-banner">
          <div className="writing-banner-details">
            <h1>{post.frontmatter.title}</h1>
            <div className="writing-banner-date">
              <h4>{post.frontmatter.date}</h4>
            </div>
            <div className="writing-banner-tags">
              <Icon icon="tag" />
              {commaSeparatedList(post.frontmatter.tags)}
            </div>
          </div>
        </div>
      </header>

      <section className="blog-section">
        <MDXRenderer>{post.parent.body}</MDXRenderer>
      </section>
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    blogPost(id:{ eq: $id }) {
      gatsbyPath(filePath: "/writing/{BlogPost.name}")
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        description
        language
        tags
      }
      parent {
        ... on Mdx {
          body
          excerpt
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
