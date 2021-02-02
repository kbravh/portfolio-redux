import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from 'react-helmet'
import { commaSeparatedList } from '../../util'
import Icon from '../../components/icon'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import '../../css/writing.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  const nodes = data.allBlogPost.nodes

  const [selectedTags, setSelectedTags] = useState(new Set())
  const [onlyCoding, setOnlyCoding] = useState(false)
  let tags = new Set(nodes
    .filter(article => onlyCoding ? !article.frontmatter.noncoding : true)
    .flatMap(article => article.frontmatter.tags))
  const [searchTerm, setSearchTerm] = useState("")

  // Filter the articles based on those that have at least one of the selected tags
  let articles = selectedTags.size === 0 ? nodes : nodes.filter(node => {
    for (const tag of node.frontmatter.tags) {
      if (selectedTags.has(tag)) {
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
        <AnimateSharedLayout>
          <AnimatePresence>
            {[...tags].map(tag => (
              <motion.button layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{duration: 0.5}}
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
              </motion.button>
            ))}
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>

      {/* Update the search term when anything is typed */}
      <div className="writing-search">
        <Icon icon="search" />
        <label htmlFor="search" style={{ width: '100%' }}>
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
        <AnimatePresence>
          {articles.map(node => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ease: "easeInOut" }}
            >
              <Link
                to={node.gatsbyPath}
                className="writing-link"
                key={node.id}
                aria-label={node.frontmatter.title}
              >
                <WritingCard post={node} />
              </Link>
            </motion.div>
          ))}
          {/* If nothing matches our filters, show a small message */}
        </AnimatePresence>
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
      <div style={{ display: "flex", alignContent: "center" }}>
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
    allBlogPost(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        gatsbyPath(filePath: "/writing/{BlogPost.name}")
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
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
