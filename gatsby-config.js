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
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.GATSBY_SENTRY_DSN, // this is the default
        tracesSampleRate: parseFloat(process.env.GATSBY_SENTRY_SAMPLERATE) || 1,
        environment: process.env.GATSBY_SENTRY_ENV,
        enabled: process.env.NODE_ENV === 'production',
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      }
    },
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: process.env.NODE_ENV !== 'production',
        disableLiveReload: false,
        environment: process.env.DATO_ENVIRONMENT ? process.env.DATO_ENVIRONMENT : '',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-transition-link',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://www.datocms-assets.com', 'https://forms-eu1.hsforms.com'],
      },
    },
  ],
};
