const path = require(`path`);

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createSlice } = actions;

  // slices api
  createSlice({
    id: `header`,
    component: require.resolve(`./src/components/Header.js`),
  });
  createSlice({
    id: `footer`,
    component: require.resolve(`./src/components/Global/Footer/Footer.js`),
  });

  return new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('./src/templates/page.js'),
      post: path.resolve('./src/templates/post.js'),
      home: path.resolve('./src/templates/home.js'),
      listPositions: path.resolve('./src/templates/list-positions.js'),
      listResolutions: path.resolve('./src/templates/list-resolutions.js'),
      listPolicyPapers: path.resolve('./src/templates/list-policy-papers.js'),
      position: path.resolve('./src/templates/position.js'),
      resolution: path.resolve('./src/templates/resolution.js'),
      post: path.resolve('./src/templates/post.js')
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
              edges {
                node {
                  title
                  slug
                  id
                }
              }
            }
            positions: allDatoCmsPosition {
              edges {
                node {
                  title
                  id
                  slug
                }
              }
            }
            resolutions: allDatoCmsResolution {
              edges {
                node {
                  title
                  id
                  slug
                }
              }
            }
            listPositions: datoCmsListPosition {
              title
              id
              slug
            }
            listResolutions: datoCmsListResolution {
              title
              id
              slug
            }
            listPolicyPapers: datoCmsListPolicyPaper {
              title
              id
              slug
            }
            home: datoCmsHome {
              title
              id
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // create the pages
        const pages = result.data.pages.edges;
        const positions = result.data.positions.edges;
        const resolutions = result.data.resolutions.edges;
        const posts = result.data.posts.edges;
        // const globalSettings = result.data.globalSettings.nodes;

        // pages
        pages.map(({ node: page }) => {
          createPage({
            path: page.slug,
            component: templates.page,
            context: {
              slug: page.slug,
              id: page.id,
            },
          });
        });

        // positions
        posts.map(({ node: post }) => {
          createPage({
            path: `/news/${post.slug}`,
            component: templates.post,
            context: {
              slug: post.slug,
              id: post.id,
            },
          });
        });

        // positions
        positions.map(({ node: position }) => {
          createPage({
            path: `/positions/${position.slug}`,
            component: templates.position,
            context: {
              slug: position.slug,
              id: position.id,
            },
          });
        });

        // resolutions
        resolutions.map(({ node: resolution }) => {
          createPage({
            path: `/positiions/resolutions/${resolution.slug}`,
            component: templates.resolution,
            context: {
              slug: resolution.slug,
              id: resolution.id,
            },
          });
        });

        // list positions
        if (result.data.listPositions) {
          createPage({
            path: result.data.listPositions.slug,
            component: templates.listPositions,
            context: {
              slug: result.data.listPositions.slug,
              id: result.data.listPositions.id,
            },
          });
        }

        // list resolutions
        if (result.data.listResolutions) {
          createPage({
            path: `/positions/${result.data.listResolutions.slug}`,
            component: templates.listResolutions,
            context: {
              slug: result.data.listResolutions.slug,
              id: result.data.listResolutions.id,
            },
          });
        }

        // list policy papers
        if (result.data.listPolicyPapers) {
          createPage({
            path: `/positions/${result.data.listPolicyPapers.slug}`,
            component: templates.listPolicyPapers,
            context: {
              slug: result.data.listPolicyPapers.slug,
              id: result.data.listPolicyPapers.id,
            },
          });
        }


        //home
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
