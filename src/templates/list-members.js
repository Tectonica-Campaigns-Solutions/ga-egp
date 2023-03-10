import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import FilterMembers from '../components/Global/FilterMembers/FilterMembers';
import SeoDatoCms from '../components/SeoDatoCms';

function ListMembers({ pageContext, location, data: { list, page, breadcrumb, favicon, siteTitle } }) {
  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      <FilterMembers members={list.edges} introduction={page.introduction} />
    </Layout>
  );
}

export const ListMembersQuery = graphql`
  query ListMembers($menuPos: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    page: datoCmsListMember {
      title
      slug
      introduction
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    list: allDatoCmsMember(sort: { title: ASC }) {
      edges {
        node {
          ...MemberCard
        }
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
  }
`;

export default ListMembers;
