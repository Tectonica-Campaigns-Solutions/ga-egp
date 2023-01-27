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
      <InnerNavigation location={location} innerMenu={navLinks} />

      <div className="container mt-5 pt-5 mb-5">
        <div className="row">
          <div className="col">
            <div className="row gy-5">
              <p>
                Lorem ipsum dolor sit amet consectetur. Nunc mauris odio pellentesque ut feugiat mauris sagittis. Morbi
                vitae in volutpat etiam leo. Tellus hac et leo eu tellus tellus neque cursus. Nunc morbi tempor sagittis
                ultricies vitae. Velit est augue proin vitae commodo. Risus scelerisque viverra consectetur duis
                volutpat. Aliquet congue etiam amet ullamcorper in eu in. Tristique vulputate mi adipiscing facilisi.
                Feugiat feugiat senectus nisl mollis amet. Sed gravida viverra quam egestas id egestas enim malesuada
                consequat.
              </p>

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
  query ListPositions {
    page: datoCmsListPosition {
      title
      slug
    }
    list: allDatoCmsPosition {
      edges {
        node {
          ...CardPosition
        }
      }
    }
    navLinks: datoCmsNavigation(codeId: { eq: "positions_navigation" }) {
      ...Navigation
    }
  }
`;
