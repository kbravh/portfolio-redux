const path = require('path')

exports.createPages = async ({
  graphql,
  actions
}) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
          fields {
            source
          }
        }
      }
    }
  `)
  const {
    createPage
  } = actions
  result.data.allMdx.nodes.forEach(node => {
    switch (node.fields.source) {
      case "writing":
        console.log(`Adding writing page ${node.frontmatter.slug}`)
        createPage({
          path: `writing/${node.frontmatter.slug}`,
          component: path.resolve(`./src/templates/writing-post.jsx`),
          context: {
            slug: node.frontmatter.slug,
            layout: "writing-post"
          },
        })
        break
      case "projects":
        console.log(`Adding projects page ${node.frontmatter.slug}`)
        createPage({
          path: `projects/${node.frontmatter.slug}`,
          component: path.resolve(`./src/templates/project.jsx`),
          context: {
            slug: node.frontmatter.slug,
            layout: "project"
          },
        })
        break
    }
  })
}
