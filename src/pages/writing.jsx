import React, {useState} from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import { commaSeparatedList } from '../util'
import Icon from '../components/icon'

import '../css/writing.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [onlyCoding, setOnlyCoding] = useState(false)
  let tags = new Set(data.allMdx.nodes
      .filter(article => onlyCoding ? !article.frontmatter.noncoding : true)
      .flatMap(article => article.frontmatter.tags))
  const [searchTerm, setSearchTerm] = useState("")

  // Filter the articles based on those that have at least one of the selected tags
  let articles = selectedTags.size === 0 ? data.allMdx.nodes : data.allMdx.nodes.filter(node => {
    for (const tag of node.frontmatter.tags) {
      if (selectedTags.has(tag)){
        return true
      }
    }
    return false
  })

  // filter the articles based on the only-coding filter
  articles = onlyCoding
    ? articles.filter(article => !article.frontmatter.noncoding)
    : articles

  // filter the articles based on the search term
  articles = articles.filter(article => article.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()))

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

      <label htmlFor="non-code">
        Only show coding articles
        <input
          type="checkbox"
          name="non-code"
          id="non-code"
          checked={onlyCoding}
          onChange={() => setOnlyCoding(!onlyCoding)}
        />
      </label>

      {/* spread the Set of tags into an array and create buttons */}
      <div className="writing-tags">
        {[...tags].map(tag => (
          <button
            key={tag}
            className={`writing-tag ${selectedTags.has(tag) ? "selected" : ""}`}
            onClick={() => {
              // create a new Set and update the state when a tag is clicked
              let newTags = new Set([...selectedTags])
              selectedTags.has(tag) ? newTags.delete(tag) : newTags.add(tag)
              setSelectedTags(newTags)
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Update the search term when anything is typed */}
      <div className="writing-search">
        <label htmlFor="search"><Icon icon="search" />
          <input
            type="search"
            name="search"
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Type here to filter posts"
            aria-label="Filter the article titles"
          />
        </label>
      </div>

      {/* Map over the filtered articles list and build article cards*/}
      <section className="writing-cards">
        {articles.map(node => (
          <Link
            to={`/writing/` + node.frontmatter.slug}
            className="writing-link" key={node.id}
            ariaLabel={node.frontmatter.title}
          >
            <WritingCard post={node} />
          </Link>
        ))}
        {/* If nothing matches our filters, show a small message */}
        {articles.length === 0 && "Oops, nothing seems to match!"}
      </section>
    </>
  )
}

const WritingCard = ({ post }) => {
  let stageIcon = (() => {
    let stage = post.frontmatter.stage
    switch (stage) {
      case 1:
        return "🌱"
      case 2:
        return "🌿"
      case 3:
        return "🌲"
      default:
        return "🌱"
    }
  })()
  return (
    <article className="writing-card">
        <div style={{display: "flex", alignContent: "center"}}>
          <div className="writing-stage">
            {stageIcon}
          </div>
          <div className="writing-card-info">
            <div className="writing-card-title">{post.frontmatter.title}</div>
            <div className="writing-card-tags">
              {commaSeparatedList(post.frontmatter.tags)}
            </div>
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
          tags
          stage
          noncoding
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
