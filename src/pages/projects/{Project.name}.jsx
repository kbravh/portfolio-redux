import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Icon from '../../components/icon'

import '../../css/project.css'

const Project = ({ data: { project, site } }) => {
  return (
    <>
      <Helmet title={project.frontmatter.title} defer={false}>
        <meta name="description" content={project.frontmatter.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@kbravh" />
        <meta name="author" content="Karey Higuera <@kbravh>" />
        <meta property="og:url" content={`${site.siteMetadata.siteUrl}${project.gatsbyPath}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={project.frontmatter.title} />
        <meta property="og:description" content={project.frontmatter.description} />
        <meta property="og:image:width" content="1050" />
        <meta property="og:image:height" content="700" />
        <meta property="og:locale" content={project.frontmatter.language} />
      </Helmet>
      <h1 className="project-title">{project.frontmatter.title}</h1>
      <div className="project-links">
        {project.frontmatter.link && <a href={project.frontmatter.link}><Icon icon="globe" /><span>Check out the project</span></a>}
        {project.frontmatter.github && <a href={project.frontmatter.github}><Icon icon="github" /><span>Check out the code</span></a>}
      </div>
      <section className="project-section">
        <MDXRenderer>{project.parent.body}</MDXRenderer>
      </section>
    </>
  )
}

export default Project

export const query = graphql`
  query($id: String!) {
    project(id: { eq: $id }) {
      gatsbyPath(filePath: "/projects/{Project.name}")
      frontmatter {
        title
        description
        date(formatString: "YYYY")
        description
        link
        github
        tags
      }
      parent {
        ... on Mdx {
          body
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
