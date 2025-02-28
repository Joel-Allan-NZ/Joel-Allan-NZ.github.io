const path = require('path')
const template = path.resolve(`./src/components/Layout.tsx`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            year
            puzz
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  const posts = result.data.allMdx.nodes

  posts
    .filter((x) => x.frontmatter.year == '2023')
    .forEach(
      (node: {
        frontmatter: { year: any; puzz: any; title: any }
        internal: { contentFilePath: any }
        id: any
      }) => {
        createPage({
          path: `advent-of-code/${node.frontmatter.year}/${node.frontmatter.puzz}`,
          component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {
            id: node.id,
            puzz: node.frontmatter.puzz,
            year: node.frontmatter.year,
            title: node.frontmatter.title,
          },
        })
      }
    )
}
