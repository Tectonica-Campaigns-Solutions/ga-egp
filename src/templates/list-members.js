import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import FilterMembers from '../components/Global/FilterMembers/FilterMembers';
import SeoDatoCMS from '../components/SeoDatoCms';

function ListMembers({ pageContext, location, data: { list, page, breadcrumb } }) {
  console.log(breadcrumb);
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      <FilterMembers members={list.edges} introduction={page.introduction} />
    </Layout>
  );
}

export const Head = ({ data: { page } }) => <SeoDatoCMS page={page} />;

export const ListMembersQuery = graphql`
  query ListMembers($menuPos: String) {
    page: datoCmsListMember {
      title
      slug
      introduction
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
