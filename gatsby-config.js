module.exports = {
  siteMetadata: {
    title: `Karey Higuera - A Portfolio`,
    description: `The online home of Karey Higuera. Developer and member of The Church of Jesus Christ of Latter-Day Saints.`,
    author: `@kbravh`,
    siteUrl: `https://kbravh.dev`
  },
  plugins: [{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              withWebp: true
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              inlineCodeMarker: `~`,
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "kbravh",
                host: "localhost",
                global: true,
              }
            },
          },
          {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
              fonts: [
                {
                  family: `Odibee Sans`,
                },
                {
                  family: `Unica One`,
                  text: ` januryfebmchpilgstovd1234567890,`
                },
                {
                  family: `Andika`,
                }
              ],
            },
          },
        ],
      },
    }
  ]
}