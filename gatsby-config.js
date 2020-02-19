const proxy = require("http-proxy-middleware")

module.exports = {
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: "https://albertacommercialgroup.com",
    pathPrefix: "/",
    title: "Alberta Commercial Group",
    titleAlt: "Alberta Commercial Group",
    description: "Servicing commercial real estate needs in Alberta.",
    banner: "/img/logo.jpg",
    headline: "Servicing commercial real estate needs in Alberta.",
    siteLanguage: "en",
    author: "Shawn Sangha",
    ogLanguage: "en_US",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content`,
        name: "cmsContent",
      },
    },

    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/index.jsx`),
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alberta Commercial Group`,
        short_name: `Alberta Commercial Group`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `static/img/logo4x3.jpg`,
      },
    },
    "gatsby-plugin-netlify-cms",
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
}
