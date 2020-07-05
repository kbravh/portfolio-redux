const path = require('path')

exports.createPages = async({
    graphql,
    actions
}) => {
    const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              slug
            }
            fields {
              source
            }
          }
        }
      }
    }
  `)
    const {
        createPage
    } = actions
    result.data.allMdx.edges.forEach(({
        node
    }) => {
        switch (node.fields.source) {
            case "writing":
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