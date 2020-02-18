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
      path: `writing/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/writing-post.jsx`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}