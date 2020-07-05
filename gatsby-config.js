module.exports = {
    siteMetadata: {
        title: `Karey Higuera - A Portfolio`,
        description: `The online home of Karey Higuera. Developer and member of The Church of Jesus Christ of Latter-Day Saints.`,
        author: `@kbravh`,
        siteUrl: `https://kbravh.dev`
    },
    plugins: [
        `gatsby-plugin-mdx-source-name`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `writing`,
                path: `${__dirname}/src/pages/writing`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/src/pages/projects`,
            },
        },
        {
            resolve: `gatsby-plugin-monetization`,
            options: {
                paymentPointer: '$ilp.uphold.com/BfyYUyGBrEgA',
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-mdx-source-name`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [{
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
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            maintainCase: true,
                            removeAccents: true,
                            isIconAfterHeader: true,
                        },
                    },
                    `gatsby-remark-external-links`,
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
                                host: "home",
                                global: true,
                            }
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [{
                        family: `Odibee Sans`,
                    },
                    {
                        family: `Unica One`,
                        // text: ` JAaNnuryFebMOchpilgStcvD1234567890,`
                    },
                    {
                        family: `Andika`,
                    }
                ],
            },
        },
        {
            resolve: "gatsby-plugin-web-font-loader",
            options: {
                custom: {
                    families: [""],
                    urls: ["/fonts/fonts.css"],
                },
            },
        },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/layout.jsx`),
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Karey Higuera Portfolio`,
                short_name: `kbravh`,
                start_url: `/`,
                background_color: `#f7f7f7`,
                theme_color: `#102542`,
                display: `standalone`,
                icon: `src/assets/favicon.png`
            },
        },
        `gatsby-plugin-offline`,
    ]
}