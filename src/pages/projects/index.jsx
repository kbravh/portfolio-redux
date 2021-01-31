import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import ProjectCard from '../../components/project-card'

export default ({ data }) => {
    const site = data.site.siteMetadata
    const nodes = data.allProject.nodes
    return (
        <>
            <Helmet title="Projects - Karey Higuera" defer={false}>
                <meta name="author" content="Karey Higuera" />
                <meta property="og:url" content={`${site.siteUrl}/projects`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Projects - Karey Higuera" />
                <meta property="og:description" content="Technical guides for web and full-stack development." />
                <meta property="og:image" content="" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="" />
                <meta name="twitter:author" content="@kbravh" />
            </Helmet>
            <h1>Projects</h1>
            <section className="project-cards">
                {nodes.map(node => (
                    <Link
                      to={node.gatsbyPath}
                      key={node.id}
                      style={{textDecoration: 'none'}}
                    >
                      <ProjectCard project={node} />
                    </Link>
                ))}
            </section>
        </>
    )
}

export const query = graphql`
  query {
    allProject(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        gatsbyPath(filePath: "/projects/{Project.name}")
        id
        frontmatter {
          title
          description
          date(formatString: "YYYY")
          link
          github
          tags
          logo
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
