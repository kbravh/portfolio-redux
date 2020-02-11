const path = require('path')

exports.createPages = async ({
  graphql,
  actions
}) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  const {
    createPage
  } = actions
  result.data.allMarkdownRemark.edges.forEach(({
    node
  }) => {
    createPage({
      path: `blog/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}