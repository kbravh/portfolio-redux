import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Icon from '../components/icon'

import '../css/project.css'

const Project = ({ data: { mdx: project, site } }) => {
  return (
    <>
      <Helmet title={project.frontmatter.title} defer={false}>
        <meta name="description" content={project.frontmatter.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kbravh" />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content={`${site.siteMetadata.siteUrl}/projects/${project.frontmatter.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={project.frontmatter.title} />
        <meta property="og:description" content={project.frontmatter.description} />
        <meta property="og:image:width" content="1050" />
        <meta property="og:image:height" content="700" />
        <meta property="og:locale" content={project.frontmatter.language} />
      </Helmet>
      <h1>{project.frontmatter.title}</h1>
      {project.frontmatter.link && <a href={project.frontmatter.link}><Icon icon="github" />Check out the project</a>}
      {project.frontmatter.github && <a href={project.frontmatter.github}><Icon icon="globe" />Check out the code</a>}
      <section className="project-section">
        <MDXRenderer>{project.body}</MDXRenderer>
      </section>
    </>
  )
}

export default Project

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        date(formatString: "YYYY")
        slug
        description
        link
        github
        tags
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
