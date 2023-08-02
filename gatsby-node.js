const path = require(`path`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
var countries = require('i18n-iso-countries');

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

const fetch = (...args) => import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

// node source from Hubspot
exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
  const bodyRequest = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "type",
            operator: "EQ",
            value: "MEMBER PARTY",
          },
          {
            propertyName: "published_in_web",
            operator: "EQ",
            value: "Yes",
          },
        ],
      },
    ],
  };
  // get data from GitHub API at build time
  const result = await fetch(`https://api.hubapi.com/crm/v3/objects/companies/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.HUBSPOT_API,
    },
    body: JSON.stringify(bodyRequest),
  });

  const resultData = await result.json();
  const companies = resultData.results.map(item => item.id)

  console.log(companies)

  //loop companies and get all relational data and create pages
  for (const company of companies) {
    const contacts = [];
    const result = await fetch(`https://api.hubapi.com/companies/v2/companies/${company}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.HUBSPOT_API,
      },
    });
    const resultObject = await result.json();
    const companyProps = resultObject.properties;

    console.log(companyProps.image)

    // associations

    const getAssociations = await fetch('https://api.hubapi.com/crm/v4/associations/Companies/Contacts/batch/read', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.HUBSPOT_API,
      },
      body: JSON.stringify({
        inputs: [{ id: resultObject.companyId }],
      }),
    });

    const resultAssociations = await getAssociations.json();

    //const resultsContacts = await getContacts.json()
    if (resultAssociations.results[0]) {
      const filterByPartyLeaders = resultAssociations.results[0].to.filter((item) =>
        item.associationTypes.map((el) => el.typeId).includes(40)
      );

      for (const item of filterByPartyLeaders) {
        const contact = item.toObjectId;
        const getContact = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contact}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.HUBSPOT_API,
          },
        });
        const contactResult = await getContact.json();
        //console.log(contactResult)
        contacts.push({ name: `${contactResult.properties.firstname} ${contactResult.properties?.lastname}` });
      }
    }

    //create node for build time of member parties from hubspot

    createNode({
      title: companyProps.name.value,
      logo: companyProps.image ? companyProps.image.value : '',
      iso_code: countries.getAlpha2Code(companyProps.country.value, 'en'),
      social: [
        {
          url: companyProps?.facebook_company_page?.value,
          socialNetwork: 'facebook',
        },
        {
          url: companyProps?.twitterhandle?.value,
          socialNetwork: 'twitter',
        },
        {
          url: companyProps?.linkedin_company_page?.value,
          socialNetwork: 'linkedin',
        },
      ],
      contact: {
        website: companyProps?.website?.value,
        email: companyProps?.organization_email ? companyProps.organization_email.value : '',
      },
      status: companyProps.membership_status?.value,
      contacts: contacts,
      // required fields
      id: String(resultObject.companyId),
      parent: null,
      children: [],
      internal: {
        type: `MemberParty`,
        contentDigest: createContentDigest(resultObject),
      },
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createSlice } = actions;

  const getMenuPosition = (menus, key) => {
    const menuId = menus.find((item) => item?.content?.id === key);
    return menuId?.id;
  };

  return new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('./src/templates/page.js'),
      post: path.resolve('./src/templates/post/post.js'),
      podcast: path.resolve('./src/templates/post/podcast.js'),
      home: path.resolve('./src/templates/home.js'),
      listPositions: path.resolve('./src/templates/list-positions.js'),
      listResolutions: path.resolve('./src/templates/list-resolutions.js'),
      listPolicyPapers: path.resolve('./src/templates/list-policy-paper/list-policy-papers.js'),
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
                  relatedTagNew {
                    id
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
                  council {
                    id
                  }
                }
              }
            }
            members: allDatoCmsMember {
              edges {
                node {
                  title
                  id
                  slug
                  isoCode
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
                  tags {
                    ... on DatoCmsTagEvent {
                      id
                    }
                  }
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
                      model {
                        apiKey
                      }
                    }
                  }
                }
              }
            }
            allInnerCongress: allDatoCmsCongressInnerPage {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allPodcasts: allDatoCmsPodcast(limit: 1000, sort: { date: DESC }) {
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
            allNews: allDatoCmsPost(limit: 1000, sort: { date: DESC }) {
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
            navTree: allDatoCmsMenu {
              nodes {
                id
                content {
                  ... on DatoCmsPage {
                    id
                  }
                  ... on DatoCmsListNews {
                    id
                  }
                  ... on DatoCmsListPodcast {
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
        const congressInnerPages = result.data.allInnerCongress.edges;
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
              // TODO
              menuPos: 'DatoCmsMenu-117741848',
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
              // TODO
              menuPos: 'DatoCmsMenu-132907294',
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
              newTag: position.relatedTagNew ? position.relatedTagNew.id : null,
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
              tagId: event.tags ? event.tags.id : null,
              menuPos: getMenuPosition(navTree, result.data.listEvents.id),
            },
          });
        });

        // congress
        congress.map(({ node: congress }) => {
          createPage({
            path: congress.slug,
            component: templates.congress,
            context: {
              slug: congress.slug,
              id: congress.id,
            },
          });
        });

        congress.map(({ node: congress }) => {
          congress.pages.map((item) => {
            createPage({
              path: item.slug,
              component: templates.congressInner,
              context: {
                slug: item.slug,
                id: item.id,
                parentId: congress.id,
              },
            });
          });
        });

        // resolutions
        resolutions.map(({ node: resolution }) => {
          createPage({
            path: `/resolutions/${resolution.slug}`,
            component: templates.resolution,
            context: {
              slug: resolution.slug,
              id: resolution.id,
              councilId: resolution.council ? resolution.council.id : null,
              menuPos: getMenuPosition(navTree, resolution.id),
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
              isoCode: member.isoCode,
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
              menuPos: getMenuPosition(navTree, result.data.listPodcats.id),
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
