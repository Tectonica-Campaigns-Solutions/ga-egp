/**
 * @type {import('gatsby').GatsbyConfig}
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `EGP`,
    siteUrl: `https://elaborate-frangipane-2705dc.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        preview: false,
        disableLiveReload: false,
        environment: process.env.DATO_ENVIRONMENT ? process.env.DATO_ENVIRONMENT : '',
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://www.datocms-assets.com', 'https://forms-eu1.hsforms.com'],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-transition-link',
  ],
};
