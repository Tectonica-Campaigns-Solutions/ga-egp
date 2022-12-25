const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('./src/templates/page.js'),
      post: path.resolve('./src/templates/post.js'),
      home: path.resolve('./src/templates/home.js'),
    };
    resolve(
      graphql(
        `
          {
            pages: allDatoCmsPage {
              edges {
                node {
                  title
                  slug
                  id
                }
              }
            }
            posts: allDatoCmsPost {
              edges{
                node {
                  title
                  slug
                  id
                }
              }
            }
            home: datoCmsHome{
              title
              id
            }
            
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // create the pages
        const pages = result.data.pages.edges;

        
        // const globalSettings = result.data.globalSettings.nodes;

        

        pages.map(({node:page}) => {
          console.log(page.slug)
          createPage({
            path: page.slug,
            component: templates.page,
            context: {
              slug: page.slug,
              id: page.id,
            },
          });
        })

        
        createPage({
          path: '/',
          component: templates.home,
          context: {
            slug: '/',
            id: result.data.home.id,
          },
        });
        

      })
    );
  });
};