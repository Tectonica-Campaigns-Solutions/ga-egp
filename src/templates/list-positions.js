import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import SeoDatoCms from '../components/Global/SeoDatoCms';

const stylesP = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '150%',
  color: '#333333',
};

function ListPositions({ pageContext, location, data: { list, page, navLinks, breadcrumb } }) {
  return (
    <Layout>
      <HeroPage title={page.title} breadcrumb={breadcrumb} context={pageContext} location={location} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <div className="container mt-5 pt-5 mb-5">
        <div className="row">
          <div className="col">
            <div className="row gy-5">
              {page.introduction && <div style={stylesP} dangerouslySetInnerHTML={{ __html: page.introduction }} />}

              {list.edges.map((item) => {
                return (
                  <div className="col-lg-4 col-md-12">
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

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const ListPositionsQuery = graphql`
  query ListPositions($menuPos: String) {
    page: datoCmsListPosition {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      seo {
        title
        description
      }
      title
      slug
      introduction
    }
    list: allDatoCmsPosition(sort: { position: ASC }) {
      edges {
        node {
          ...CardPosition
        }
      }
    }
    navLinks: datoCmsMenu(id: {eq: $menuPos}) {
      title
      treeParent {
        title
        treeChildren {
          id
          ... on DatoCmsMenu{
            id
            title
            content{
              ... on DatoCmsPage{
                slug
                model{
                  apiKey
                }
              }
              ... on DatoCmsListNews{
                slug
                model{
                  apiKey
                }
              }
              ... on DatoCmsListPosition{
                slug
                model{
                  apiKey
                }
              }
            }
          }
        }
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ... Breadcrumb
    }
  }
`;
