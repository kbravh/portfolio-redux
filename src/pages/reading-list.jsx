import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"

import {readingListCompleteRaw, readingListRaw} from '../data/reading_list';

import '../css/reading_list.css'

export default ({ data }) => {
  const site = data.site.siteMetadata
  return (
    <>
      <Helmet title="Writing - Karey Higuera" defer={false}>
        <meta name="author" content="Karey Higuera" />
        <meta property="og:url" content={`${site.siteUrl}/writing`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Writing - Karey Higuera" />
        <meta
          property="og:description"
          content="Technical guides for web and full-stack development."
        />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="@kbravh" />
      </Helmet>
      <h1>2022 Reading List</h1>
      <ul style={{maxWidth: '600px', margin: 'auto'}}>
        {readingListRaw.map(book => (
          <ReadingListItem book={book} key={book.title} />
        ))}
      </ul>
      <h2>Finished books <span role="img" aria-label="confetti">🎉</span></h2>
      <ul style={{maxWidth: '600px', margin: 'auto'}}>
          {readingListCompleteRaw.map(book => (
            <CompleteListItem book={book} key={book.title} />
          ))}
      </ul>
    </>
  )
}

const ReadingListItem = ({ book }) => {
  return (
    <li
      className="reading-list-item"
      style={{
        listStyle: "none",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <a
        href={book.url}
        style={{
          marginRight: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          style={{ aspectRatio: "auto", width: "100px", borderRadius: "3px" }}
        />
      </a>
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <h4 style={{ margin: 0 }}>{book.title}</h4>
        <h5 style={{ margin: 0 }}>{book.author}</h5>
        <p>{book.comment}</p>
      </div>
    </li>
  )
}

const CompleteListItem = ({ book }) => {
  return (
    <li
      className="complete-list-item"
      style={{
        listStyle: "none",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <a
        href={book.url}
        style={{
          marginRight: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          style={{ aspectRatio: "auto", width: "100px", borderRadius: "3px" }}
        />
      </a>
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <h4 style={{ margin: 0 }}>{book.title}</h4>
        <h5 style={{ margin: 0 }}>{book.author}</h5>
        <h5 style={{ margin: 0, marginTop: 5 }}>Finished on {book.date}</h5>
        {book.comment && <p>{book.comment}</p>}
      </div>
    </li>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
