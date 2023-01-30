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
      listMembers: path.resolve('./src/templates/list-members.js'),
      listNews: path.resolve('./src/templates/list-news.js'),
      listEvents: path.resolve('./src/templates/list-events.js'),
      position: path.resolve('./src/templates/position.js'),
      resolution: path.resolve('./src/templates/resolution.js'),
      post: path.resolve('./src/templates/post/post.js'),
      member: path.resolve('./src/templates/member/member.js'),
      person: path.resolve('./src/templates/person/person.js'),
      event: path.resolve('./src/templates/event/event.js'),
    };
    resolve(
      graphql(
        `
          {
            mainMenu: datoCmsNavigation(codeId: { eq: "main_menu" }) {
              navigationItems {
                ... on DatoCmsNavigationItem {
                  label
                }
              }
            }
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
            members: allDatoCmsMember {
              edges {
                node {
                  title
                  id
                  slug
                }
              }
            }
            persons: allDatoCmsPerson {
              edges {
                node {
                  name
                  id
                  slug
                }
              }
            }

            events: allDatoCmsEvent {
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
            listMembers: datoCmsListMember {
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
            listNews: datoCmsListNews {
              title
              id
              slug
            }
            allNews: allDatoCmsPost(limit: 1000) {
              edges {
                node {
                  id
                  title
                  slug
                  image {
                    alt
                    gatsbyImageData
                  }
                  tags {
                    ... on DatoCmsTagNews {
                      title
                      id
                      slug
                    }
                  }
                  date(formatString: "D MMM Y")
                  model {
                    apiKey
                  }
                  meta {
                    publishedAt(formatString: "D MMM YYYY")
                  }
                }
              }
            }
            tagsNews: allDatoCmsTagNews {
              edges {
                node {
                  title
                  slug
                  id
                }
              }
            }
            listEvents: datoCmsListEvent {
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
        const members = result.data.members.edges;
        const persons = result.data.persons.edges;
        const events = result.data.events.edges;
        const tagsNews = result.data.tagsNews.edges;
        const allNews = result.data.allNews.edges;
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

        // posts
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
            path: position.slug,
            component: templates.position,
            context: {
              slug: position.slug,
              id: position.id,
            },
          });
        });

        // positions
        events.map(({ node: event }) => {
          createPage({
            path: `/events/${event.slug}`,
            component: templates.event,
            context: {
              slug: event.slug,
              id: event.id,
            },
          });
        });

        // resolutions
        resolutions.map(({ node: resolution }) => {
          createPage({
            path: `/positions/resolutions/${resolution.slug}`,
            component: templates.resolution,
            context: {
              slug: resolution.slug,
              id: resolution.id,
            },
          });
        });

        // member
        members.map(({ node: member }) => {
          createPage({
            path: result.data.listMembers ? `${result.data.listMembers.slug}/${member.slug}` : member.slug,
            component: templates.member,
            context: {
              slug: result.data.listMembers ? `${result.data.listMembers.slug}/${member.slug}` : member.slug,
              id: member.id,
              titleParent: result.data.listMembers ? result.data.listMembers.title : null,
            },
          });
        });

        // people
        persons.map(({ node: person }) => {
          createPage({
            path: `/organisation/${person.slug}`,
            component: templates.person,
            context: {
              slug: person.slug,
              id: person.id,
            },
          });
        });

        // tags news
        tagsNews.map(({ node: tag }) => {
          const items = allNews.filter((item) => item.node.tags.id === tag.id);
          createPage({
            path: `news/${tag.slug}`,
            component: templates.listNews,
            context: {
              slug: `news/${tag.slug}`,
              id: tag.id,
              items: items,
              tag: tag.title,
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

        // list events
        if (result.data.listEvents) {
          createPage({
            path: result.data.listEvents.slug,
            component: templates.listEvents,
            context: {
              slug: result.data.listEvents.slug,
              id: result.data.listEvents.id,
            },
          });
        }

        // list resolutions
        if (result.data.listResolutions) {
          createPage({
            path: result.data.listResolutions.slug,
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
            path: result.data.listPolicyPapers.slug,
            component: templates.listPolicyPapers,
            context: {
              slug: result.data.listPolicyPapers.slug,
              id: result.data.listPolicyPapers.id,
            },
          });
        }

        // list news
        if (result.data.listNews) {
          createPage({
            path: result.data.listNews.slug,
            component: templates.listNews,
            context: {
              slug: result.data.listNews.slug,
              id: result.data.listNews.id,
              items: allNews,
            },
          });
        }

        // list members
        if (result.data.listMembers) {
          createPage({
            path: result.data.listMembers.slug,
            component: templates.listMembers,
            context: {
              slug: result.data.listMembers.slug,
              id: result.data.listMembers.id,
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
