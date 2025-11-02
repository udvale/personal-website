const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Udval Enkhtaivan',
    siteUrl: 'https://udvale.vercel.app',
    image: '/', 
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Udval Enkhtaivan',
        short_name: 'Udval Enkhtaivan',
        start_url: '/*',
        background_color: config.colors.green,
        theme_color: config.colors.green,
        display: 'minimal-ui',
        icon: 'src/images/logo2.png',
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-45666519-2',
      },
    },
  ],
};
