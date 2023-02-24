const path = require(`path`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createSlice } = actions;

  const getMenuPosition = (menus, key) => {
      const menuId = menus.find(item => item?.content?.id === key)
      return menuId?.id
  };

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
      post: path.resolve('./src/templates/post/post.js'),
      podcast: path.resolve('./src/templates/post/podcast.js'),
      home: path.resolve('./src/templates/home.js'),
      listPositions: path.resolve('./src/templates/list-positions.js'),
      listResolutions: path.resolve('./src/templates/list-resolutions.js'),
      listPolicyPapers: path.resolve('./src/templates/list-policy-papers.js'),
      listMembers: path.resolve('./src/templates/list-members.js'),
      listNews: path.resolve('./src/templates/list-news.js'),
      listEvents: path.resolve('./src/templates/list-events.js'),
      listPodcast: path.resolve('./src/templates/list-podcast.js'),
      position: path.resolve('./src/templates/position/position.js'),
      resolution: path.resolve('./src/templates/resolution/resolution.js'),
      member: path.resolve('./src/templates/member/member.js'),
      person: path.resolve('./src/templates/person/person.js'),
      event: path.resolve('./src/templates/event/event.js'),
      congress: path.resolve('./src/templates/congress/congress.js'),
      congressInner: path.resolve('./src/templates/congress/congress-inner.js'),
      jobOpportunity: path.resolve('./src/templates/job-opportunity/job-opportunity.js'),
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
                  menuInner {
                    id
                  }
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
            positions: allDatoCmsPosition(sort: { position: ASC }) {
              edges {
                node {
                  title
                  id
                  slug
                  model {
                    apiKey
                  }
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
              menuInner {
                id
              }
            }
            listMembers: datoCmsListMember {
              title
              id
              slug
            }
            listPolicyPapers: datoCmsListPolicyPaper {
              title
              id
              slug
              menuInner {
                id
              }
            }
            listNews: datoCmsListNews {
              title
              id
              slug
            }
            listPodcats: datoCmsListPodcast {
              title
              id
              slug
            }
            allCongress: allDatoCmsCongress {
              edges {
                node {
                  title
                  id
                  slug
                  pages {
                    ... on DatoCmsCongressInnerPage {
                      title
                      slug
                      id
                    }
                  }
                }
              }
            }
            allPodcasts: allDatoCmsPodcast(limit: 1000) {
              edges {
                node {
                  title
                  id
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
            jobs: allDatoCmsJobOpportunity {
              edges {
                node {
                  title
                  id
                  slug
                }
              }
            }
            navTree: allDatoCmsMenu{
              nodes{
                id
                content {
                    ... on DatoCmsPage {
                      id
                    }
                    ... on DatoCmsListNews {
                      id
                    }
                    ... on DatoCmsListPosition {
                      id
                    }
                    ... on DatoCmsListMember {
                      id
                    }
                    ... on DatoCmsListPolicyPaper {
                      id
                    }
                    ... on DatoCmsListResolution {
                      id
                    }
                    ... on DatoCmsListEvent {
                      id
                    }
                    ... on DatoCmsPosition {
                      id
                    }
                  }
              }
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
        const congress = result.data.allCongress.edges;
        const allPodcasts = result.data.allPodcasts.edges;
        const navTree = result.data.navTree.nodes;
        const jobs = result.data.jobs.edges;

        // const globalSettings = result.data.globalSettings.nodes;

        //home
        if (result.data.home) {
          createPage({
            path: '/',
            component: templates.home,
            context: {
              slug: '/',
              id: result.data.home.id,
            },
          });
        }

        // pages
        pages.map(({ node: page }) => {
          createPage({
            path: page.slug,
            component: templates.page,
            context: {
              slug: page.slug,
              id: page.id,
              menuPos: getMenuPosition(navTree, page.id),
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

        // podcast
        allPodcasts.map(({ node: post }) => {
          createPage({
            path: `/podcast/${post.slug}`,
            component: templates.podcast,
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
              menuPos: getMenuPosition(navTree, position.id),
              parentTitle: result.data.listPositions?.title ? result.data.listPositions?.title : null,
            },
          });
        });

        // events
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

        // congress
        congress.map(({ node: congress }) => {
          createPage({
            path: `/events/${congress.slug}`,
            component: templates.congress,
            context: {
              slug: congress.slug,
              id: congress.id,
            },
          });
        });

        // congress inner page
        congress.map(({ node: congress }) => {
          congress.pages.map((item) => {
            createPage({
              path: `/events/${congress.slug}/${item.slug}`,
              component: templates.congressInner,
              context: {
                slug: item.slug,
                id: item.id,
                congressTitle: congress.title,
                congressMenu: congress.pages,
                congressSlug: congress.slug,
              },
            });
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
          const items = allNews.filter((newItem) => {
            const newTags = newItem.node.tags;
            return newTags.some((newTag) => newTag.id === tag.id);
          });

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

        // tags podcast
        tagsNews.map(({ node: tag }) => {
          const items = allPodcasts.filter((newItem) => {
            const newTags = newItem.node.tags;
            return newTags.some((newTag) => newTag.id === tag.id);
          });

          if (items && items.length > 0) {
            createPage({
              path: `podcast/${tag.slug}`,
              component: templates.listPodcast,
              context: {
                slug: `podcast/${tag.slug}`,
                id: tag.id,
                items: items,
                tag: tag.title,
              },
            });
          }
        });

        // list positions
        if (result.data.listPositions) {
          createPage({
            path: result.data.listPositions.slug,
            component: templates.listPositions,
            context: {
              slug: result.data.listPositions.slug,
              id: result.data.listPositions.id,
              menuPos: getMenuPosition(navTree, result.data.listPositions.id),
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
              menuPos: getMenuPosition(navTree, result.data.listEvents.id),
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
              menuPos: getMenuPosition(navTree, result.data.listPolicyPapers.id),
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
              menuPos: getMenuPosition(navTree, result.data.listNews.id),
            },
          });
        }

        // list podcast
        if (result.data.listPodcats) {
          createPage({
            path: result.data.listPodcats.slug,
            component: templates.listPodcast,
            context: {
              slug: result.data.listPodcats.slug,
              id: result.data.listPodcats.id,
              items: allPodcasts,
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
              menuPos: getMenuPosition(navTree, result.data.listMembers.id),
            },
          });
        }

        // Job opportunity details
        jobs.map(({ node: job }) => {
          createPage({
            path: `/job-opportunity/${job.slug}`,
            component: templates.jobOpportunity,
            context: {
              slug: job.slug,
              id: job.id,
            },
          });
        });
      })
    );
  });
};
