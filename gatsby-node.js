const Path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      Highlights: [Highlight]
      Specs: [Spec]
      Areas: [Area]
      Description: String
    }

    type Highlight {
      Description: String
    }

    type Spec {
      Key: String
      Value: String
    }

    type Area {
      Area: String
      Size: String
    }

  `
  createTypes(typeDefs)
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins }) => {
  actions.setWebpackConfig({
    module: {
      rules:
        stage === "build-html"
          ? [
              {
                test: /ScrollMagic/,
                use: loaders.null(),
              },
              {
                test: /scrollmagic/,
                use: loaders.null(),
              },
            ]
          : [],
    },
    resolve: {
      alias: {
        TweenLite: Path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TweenLite.js"
        ),
        TweenMax: Path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TweenMax.js"
        ),
        TimelineLite: Path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TimelineLite.js"
        ),
        TimelineMax: Path.resolve(
          "node_modules",
          "gsap/src/uncompressed/TimelineMax.js"
        ),
        ScrollMagic: Path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"
        ),
        "animation.gsap": Path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js"
        ),
        "debug.addIndicators": Path.resolve(
          "node_modules",
          "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js"
        ),
      },
    },
    plugins: [
      plugins.define({
        "process.env.GOOGLE": JSON.stringify(`${process.env.GOOGLE_KEY}`),
      }),
    ],
  })
}

exports.createPages = ({ actions: { createPage }, graphql }) => {
  return graphql(`
    query Pages {
      listings: allMarkdownRemark(
        filter: { frontmatter: { Type: { eq: "listing" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              Agent
            }
          }
        }
      }
    }
  `).then(result => {
    const listings = result.data.listings.edges

    // eslint-disable-next-line array-callback-return
    Array.from({ length: listings.length }).map((_, index) => {
      createPage({
        path: `/listings/${listings[index].node.id}`,
        component: Path.resolve("./src/templates/listings/index.jsx"),
        context: {
          id: listings[index].node.id,
          target: listings[index].node.frontmatter.Agent,
        },
      })
    })
  })
}
