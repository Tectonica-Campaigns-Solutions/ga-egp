import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';

const Page = ({ data: { page } }) => {
  return (
    <Layout>
      <h1>{page.title}</h1>
    </Layout>
  );
};

export default Page;

export const PageQuery = graphql`
  query PageById($id: String) {
    page: datoCmsPage(id: { eq: $id }) {
      id
      title
      slug
    }
  }
`;
