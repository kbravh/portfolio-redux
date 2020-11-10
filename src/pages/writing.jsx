import React, {useState} from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import { commaSeparatedList } from '../util'
import Icon from '../components/icon'

import '../css/writing.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  const tags = new Set(data.allMdx.nodes.flatMap(node => node.frontmatter.tags))
  const [selectedTags, setSelectedTags] = useState(new Set())
  let articles = selectedTags.size === 0 ? data.allMdx.nodes : data.allMdx.nodes.filter(node => {
    for (const tag of node.frontmatter.tags) {
      if (selectedTags.has(tag)){
        return true
      }
    }
    return false
  })
  return (
    <>
      <Helmet title="Writing - Karey Higuera" defer={false}>
        <meta name="author" content="Karey Higuera" />
        <meta property="og:url" content={`${site.siteUrl}/writing`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Writing - Karey Higuera" />
        <meta property="og:description" content="Technical guides for web and full-stack development." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
      </Helmet>
      <h1>Writing</h1>
      <p>Here you'll find all of my writing in a sort of digital garden. Some of these are still in the works, so bear with me as I tend to these articles. Feel free to reach out with any feedback!</p>
      <div className="writing-tags">{[...tags].map(tag => (
          <button className={`writing-tag ${selectedTags.has(tag) ? "selected" : ""}`} onClick={() => {
            let newTags = new Set([...selectedTags])
            selectedTags.has(tag) ? newTags.delete(tag) : newTags.add(tag)
            setSelectedTags(newTags)
          }}>
            {tag}
          </button>
        )
      )}</div>
      <section className="writing-cards">
        {articles.map(node => (
          <Link to={`/writing/` + node.frontmatter.slug} className="writing-link" key={node.id}>
            <WritingCard post={node} />
          </Link>
        ))}
      </section>
    </>
  )
}

const WritingCard = ({ post }) => {
  return (
    <article className="writing-card">
        <div className="writing-card-info">
          <div className="writing-card-title">{post.frontmatter.title}</div>
          <div className="writing-card-tags">
            {commaSeparatedList(post.frontmatter.tags)}
          </div>
        </div>
        <Icon icon="arrow-right" />
    </article>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: {source: {eq: "writing"}}}
    ) {
      totalCount
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          slug
          description
          tags
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
