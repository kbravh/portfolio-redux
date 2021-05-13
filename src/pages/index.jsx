import React from "react"
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import WritingCard from '../components/writing-card'
import Icon from '../components/icon'
import useWindowSize from '../hooks/useWindowSize'

import '../css/home.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  const articles = data.allBlogPost.nodes
  const projects = data.allProject.nodes

  const { width } = useWindowSize()

  return (
    <>
      <Helmet defer={false}>
        <meta property="og:url" content={site.siteUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Karey Higuera" />
        <meta property="og:description" content="Online portfolio for Karey Higuera, full-stack developer." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
      </Helmet>
      <h1>Karey Higuera</h1>
      <h2 style={{ marginTop: 0 }}>Full-stack developer</h2>
      <p>I'm a self-taught, full-stack developer passionate about modern web technologies. I work with JavaScript and React on the front-end and Node.js in cloud services on the back-end. I enjoy utilizing serverless functionality to make the web a simpler, more maintainable space.</p>

      <div className="featured">
        <div className="featuredArticles">
          <h4>Featured articles</h4>
          <div className="writingCards">
            {articles.map(article => (
              <Link
                to={article.gatsbyPath}
                className="featured-link"
                key={article.id}
                aria-label={article.frontmatter.title}
              >
                <WritingCard post={article} />
              </Link>
            ))}
          </div>
        </div>
        <div className="featuredProjects">
          <h4>Featured projects</h4>
          <div className="projectCards">
            {projects.map(project => (
              <Link
                to={project.gatsbyPath}
                className="featured-link"
                key={project.id}
                aria-label={project.frontmatter.title}
              >
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {width < 600 &&
        <>
          <p style={{ textAlign: "center" }}>Find me around the web!</p>
          <div className="social-links">
            <a href="https://github.com/kbravh" alt="GitHub"><Icon icon="github" /></a>
            <a href="https://www.linkedin.com/in/kbravh/" alt="LinkedIn"><Icon icon="linkedin" /></a>
            <a href="https://codepen.io/kbravh" alt="CodePen"><Icon icon="codepen" /></a>
            <a href="https://twitter.com/kbravh" alt="Twitter" s><Icon icon="twitter" /></a>
          </div>
        </>
      }
    </>
  )
}

const ProjectCard = ({ project }) => (
  <article className="featured-project-card">
    <div className="featured-project-card-logo">
      <img src={`logos/${project.frontmatter.logo}.png`} alt={`${project.frontmatter.title} logo`} />
    </div>
    <div className="featured-project-card-title">{project.frontmatter.title}</div>
    <Icon icon="arrow-right" />
  </article>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allBlogPost(filter: {frontmatter: {featured: {eq: true}}},
                sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        gatsbyPath(filePath: "/writing/{BlogPost.name}")
        frontmatter {
          title
          tags
          date(formatString: "DD MMMM, YYYY")
          stage
        }
      }
    }
    allProject(filter: {frontmatter: {featured: {eq: true}}}) {
      nodes {
        gatsbyPath(filePath: "/projects/{Project.name}")
        frontmatter {
          title
          logo
        }
      }
    }
  }
`
