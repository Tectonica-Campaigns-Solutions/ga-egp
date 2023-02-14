import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import FilterMembers from '../components/Global/FilterMembers/FilterMembers';

function ListMembers({ pageContext, location, data: { list, page, breadcrumb } }) {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb}/>
      <FilterMembers members={list.edges} introduction={page.introduction} />
    </Layout>
  );
}

export const ListMembersQuery = graphql`
  query ListMembers {
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
    breadcrumb: datoCmsMenu(id: { eq: "DatoCmsMenu-119373300" }) {
      ... Breadcrumb
    }
  }
`;

export default ListMembers;
