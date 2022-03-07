---
title: HTML Entities from the Twitter v2 API
description: The Twitter v2 API sends back tweets with characters embedded as HTML entities. A look into how to deal with this and possible reasons it could be the case.
date: 2022-02-26
language: en_US
featured: false
tags:
  - Twitter
---

While working on my Tweet to Markdown projects, I realized that the Twitter API was sending back the text of the tweets with some characters encoded as HTML entities.

## What are HTML entities?
HTML entities are short codes used to represent characters that could otherwise be interpreted as HTML code. They begin with an & symbol and end with a semi-colon. For example, if you wanted to write a less-than sign "<", you would need to use the code `&lt;`. Otherwise, the HTML parser might think that it's the beginning of an HTML tag like the first character in `<div>`.

If you are working with React and JSX, there is an [eslint rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md) that will warn you if you don't use an HTML entity when you should.

More information regarding HTML entities can be found in the [MDN docs](https://developer.mozilla.org/en-US/docs/Glossary/Entity), and a full (albeit overwhelming) list of HTML entities can be found as part of the [HTML specification](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

## How to clean up HTML entites
Thankfully, there are plenty of libraries in each programming language that can take care of parsing HTML entities back into their respective symbols. For Node.js, I use the aptly named [html-entities](https://github.com/mdevils/html-entities) library. For example, this is how I would handle retrieving a tweet from the Twitter API.

```ts
import { decode } from 'html-entities'
import {default as Axios} from 'axios'

const bearer = `<bearer-token>`
const tweetId = '<tweet-id>'

const tweet = await Axios({
    method: 'GET',
    url: `https://api.twitter.com/2/tweets/${id}`,
    headers: {Authorization: `Bearer ${bearer}`},
  })
    .then(response => response.data)

const decodedText = decode(tweet.data.text)
```

Once we fetch the tweet from the API, we just pass the text to the `js~decode()` function, and we'll get back our tweet with the symbols as we expect them.
```js
console.log(tweet.data.text)
// This tweet has an ampersand (&amp;).

console.log(decode(tweet.data.text))
// This tweet has an ampersand (&).
```

## Why would Twitter encode the characters?
I haven't found a documented reason as to why Twitter encodes their tweet text with HTML entities. My best guess is that it's to protect their users from potential mistakes or code injection. If I pull a tweet from the API and embed it in a div using the `innerHTML` property, any HTML code could be injected there. By encoding all HTML entities in the tweet text, this becomes harmless and removes a potential attack vector.
