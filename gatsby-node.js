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
  // TODO: ADD PAGINATION ON FUTURE... MAX 100 ITEMS PER REQUEST
  const result = await fetch('https://api.hubspot.com/crm/v3/objects/2-117824001/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.HUBSPOT_API,
    },
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'published_in_the_site',
              operator: 'EQ',
              value: 'Yes',
            },
            {
              propertyName: 'egp_membership_status',
              operator: 'IN',
              values: ['Full Member', 'Associate Member', 'Candidate Member'],
            },
          ],
        },
      ],
      properties: [
        'member_party_name',
        'country',
        'id',
        'logo',
        'facebook',
        'linkedin',
        'twitter',
        'instagram',
        'youtube',
        'member_party_main_email',
        'egp_membership_status',
        'website',
      ],
      limit: 100,
    }),
  });

  const resultData = await result.json();

  //loop companies and get all relational data and create pages
  for (const company of resultData.results) {
    const contacts = [{ name: '' }];
    const getAssociations = await fetch('https://api.hubapi.com/crm/v4/associations/2-117824001/Contacts/batch/read', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.HUBSPOT_API,
      },
      body: JSON.stringify({
        inputs: [{ id: company.id }],
      }),
    });

    const resultAssociations = await getAssociations.json();

    //const resultsContacts = await getContacts.json()
    if (resultAssociations.results[0]) {
      const filterByPartyLeaders = resultAssociations.results[0]?.to;

      for (const item of filterByPartyLeaders) {
        const contact = item.toObjectId;

        const hasChairType = item.associationTypes.find((a) => a.typeId === 116);

        if (!hasChairType) {
          continue;
        }

        const getContact = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contact}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.HUBSPOT_API,
          },
        });
        const contactResult = await getContact.json();
        contacts.push({
          name: `${contactResult.properties?.firstname} ${
            contactResult.properties?.lastname ? contactResult.properties.lastname : ''
          }`,
        });
      }
    }

    //create node for build time of member parties from hubspot

    // hotfix
    const isMoldova = company.properties?.country ? company.properties?.country === 'Moldova' : '';

    createNode({
      title: company.properties?.member_party_name,
      logo: company.properties?.logo ? company.properties?.logo : '',
      iso_code: isMoldova ? 'MD' : countries.getAlpha2Code(company.properties?.country, 'en'),
      social: [
        {
          url: company.properties?.facebook,
          socialNetwork: 'facebook',
        },
        {
          url: company.properties?.twitter,
          socialNetwork: 'twitter',
        },
        {
          url: company.properties?.linkedin,
          socialNetwork: 'linkedin',
        },
        {
          url: company.properties?.instagram,
          socialNetwork: 'instagram',
        },
        {
          url: company.properties?.youtube,
          socialNetwork: 'youtube',
        },
      ],
      contact: {
        website: company.properties?.website ? company.properties.website : '',
        email: company.properties?.member_party_main_email ? company.properties?.member_party_main_email : '',
      },
      status: company.properties?.egp_membership_status ? company.properties.egp_membership_status : '',
      contacts: contacts,
      // required fields
      id: String(company.id),
      parent: null,
      children: [],
      internal: {
        type: `MemberParty`,
        contentDigest: createContentDigest(company),
      },
    });
  }
};

const getMenuPosition = (menus, key) => {
  const menuId = menus.find((item) => item?.content?.id === key);
  return menuId?.id ? menuId.id : '';
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const templates = {
      page: path.resolve('./src/templates/page.js'),
      post: path.resolve('./src/templates/post/post.js'),
      pressRelease: path.resolve('./src/templates/press-release/press-release.js'),
      podcast: path.resolve('./src/templates/post/podcast.js'),
      home: path.resolve('./src/templates/home.js'),
      listPositions: path.resolve('./src/templates/list-positions.js'),
      listResolutions: path.resolve('./src/templates/list-resolutions.js'),
      listPolicyPapers: path.resolve('./src/templates/list-policy-paper/list-policy-papers.js'),
      listMembers: path.resolve('./src/templates/list-members.js'),
      listNews: path.resolve('./src/templates/list-news.js'),
      listPressReleases: path.resolve('./src/templates/list-press-releases.js'),
      listEvents: path.resolve('./src/templates/list-events.js'),
      listPodcast: path.resolve('./src/templates/list-podcast.js'),
      listJobs: path.resolve('./src/templates/list-jobs.js'),
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
            redirects: allDatoCmsRedirect {
              edges {
                node {
                  id
                  from
                  to
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
            pressReleases: allDatoCmsPressRelease {
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
            persons: allDatoCmsPerson(filter: { hasDetailPage: { eq: true } }) {
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
            listPressReleases: datoCmsListPressRelease {
              title
              id
              slug
            }
            listPodcats: datoCmsListPodcast {
              title
              id
              slug
            }
            listJobs: datoCmsListJobOp {
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
                      color
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
                      color
                    }
                  }
                  date(formatString: "D MMM Y")
                  model {
                    apiKey
                  }
                }
              }
            }
            allPressReleases: allDatoCmsPressRelease(limit: 1000, sort: { date: DESC }) {
              edges {
                node {
                  id
                  title
                  slug
                  tags {
                    ... on DatoCmsTagNews {
                      title
                      id
                      slug
                      color
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
                  color
                }
              }
            }
            listEvents: datoCmsListEvent {
              title
              id
              slug
            }
            home: datoCmsHome {
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
                  ... on DatoCmsTagNews {
                    id
                  }
                  ... on DatoCmsListJobOp {
                    id
                  }
                  ... on DatoCmsListNews {
                    id
                  }
                  ... on DatoCmsListPressRelease {
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
        const pressReleases = result.data.pressReleases.edges;
        const members = result.data.members.edges;
        const persons = result.data.persons.edges;
        const events = result.data.events.edges;
        const tagsNews = result.data.tagsNews.edges;
        const allNews = result.data.allNews.edges;
        const allPressReleases = result.data.allPressReleases.edges;
        const congress = result.data.allCongress.edges;
        const congressInnerPages = result.data.allInnerCongress.edges;
        const allPodcasts = result.data.allPodcasts.edges;
        const navTree = result.data.navTree.nodes;
        const jobs = result.data.jobs.edges;
        const redirects = result.data.redirects.edges;

        // Redirects
        redirects.map(({ node: redirect }) => {
          console.log(`Creating redirect from: ${redirect.from} to: ${redirect.to}`);

          createRedirect({
            fromPath: redirect.from,
            toPath: redirect.to,
            statusCode: 301,
            force: true,
          });
        });

        // const globalSettings = result.data.globalSettings.nodes;

        // home
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

        // press releases
        pressReleases.map(({ node: release }) => {
          createPage({
            path: `/press-releases/${release.slug}`,
            component: templates.pressRelease,
            context: {
              slug: release.slug,
              id: release.id,
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
              menuPos: 'DatoCmsMenu-128045800',
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

          const itemsPR = allPressReleases.filter((newItem) => {
            const newTags = newItem.node.tags;
            return newTags.some((newTag) => newTag.id === tag.id);
          });

          const finalItems = [...items, ...itemsPR].sort((a, b) => {
            const dateA = new Date(a.node.date);
            const dateB = new Date(b.node.date);

            return dateB - dateA;
          });

          createPage({
            path: `news/${tag.slug}`,
            component: templates.listNews,
            context: {
              slug: `news/${tag.slug}`,
              id: tag.id,
              items: finalItems,
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

        //list jobs
        if (result.data.listJobs) {
          createPage({
            path: result.data.listJobs.slug,
            component: templates.listJobs,
            context: {
              slug: result.data.listJobs.slug,
              id: result.data.listJobs.id,
              menuPos: getMenuPosition(navTree, result.data.listJobs.id),
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

        // list press releases
        if (result.data.listPressReleases) {
          createPage({
            path: result.data.listPressReleases.slug,
            component: templates.listPressReleases,
            context: {
              slug: result.data.listPressReleases.slug,
              id: result.data.listPressReleases.id,
              items: allPressReleases,
              menuPos: getMenuPosition(navTree, result.data.listPressReleases.id),
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
