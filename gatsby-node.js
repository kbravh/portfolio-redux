const path = require('path')

exports.onCreateNode = async ({
    node,
    getNode,
    createNodeId,
    createContentDigest,
    loadNodeContent,
    actions
  }) => {

  const {createNode, createParentChildLink} = actions
  // hop out if this isn't an mdx file
  if(node.internal.type !== 'Mdx') return

  // the sourceInstanceName is the options.name passed to `gatsby-source-filesystem`
  const { sourceInstanceName } = getNode(node.parent)

  // assign a new node type based on the source of the mdx file
  let nodeType = `NewNode`;
  if (sourceInstanceName === 'writing'){
    nodeType = `blogPost`
  } else if (sourceInstanceName === `projects`){
    nodeType = `project`
  }

  // load the content of the mdx node
  const content = await loadNodeContent(node)


  // pull in frontmatter from the Mdx node
  const {frontmatter} = node

  // if the slug is defined manually, we'll let it take precedence
  const name = frontmatter.slug || frontmatter.title

  // define the new node
  const newNode = {
    frontmatter,
    name,
    // set new fields
    id: createNodeId(`${node.id} >>> MDX`),
    parent: node.id,
    children: [],
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(content),
    }
  }
  // create the new node and add its id to its parent
  createNode(newNode)
  createParentChildLink({parent: node, child: newNode})
}
