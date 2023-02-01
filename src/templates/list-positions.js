import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';
import HeroPage from '../components/Global/HeroPage/HeroPage';

function ListPositions({ pageContext, location, data: { list, page, navLinks } }) {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} />
      { navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <div className="container mt-5 pt-5 mb-5">
        <div className="row">
          <div className="col">
            <div className="row gy-5">
              
              {
                page.introduction &&  <div
                  dangerouslySetInnerHTML={{__html: page.introduction}}
                />
              }

              {list.edges.map((item) => {
                return (
                  <div className="col-lg-4">
                    <CardPosition position={item.node} showButtons={false} small />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ListPositions;

export const ListPositionsQuery = graphql`
  query ListPositions($menuInner: String) {
    page: datoCmsListPosition {
      title
      slug
      introduction
    }
    list: allDatoCmsPosition(sort: {position: ASC}) {
      edges {
        node {
          ...CardPosition
        }
      }
    }
    navLinks: datoCmsNavigation(id: { eq: $menuInner }) {
      ...Navigation
    }
  }
`;
