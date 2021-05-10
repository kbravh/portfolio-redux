import React from 'react'
import { commaSeparatedList } from '../util'
import Icon from './icon'

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
      <div className="writing-card-container">
        <div className="writing-card-title" >{post.frontmatter.title}</div>
        <div className="writing-card-details">
          <div className="writing-card-left">
            <div className="writing-stage">
              {stageIcon}
            </div>
            <div className="writing-card-tags">{commaSeparatedList(post.frontmatter.tags)}</div>
          </div>
          <div className="writing-card-date">{post.frontmatter.date}</div>
        </div>
      </div>
      <Icon icon="arrow-right" />
    </article>
  )
}

export default WritingCard