import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import InnerNavigation from '../../components/Global/InnerNavigation/InnerNavigation';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Link from '../../components/Global/Link';
import { pathToModel } from '../../utils';

const Position = ({pageContext, location, data: { position, navLinks } }) => {
  const { siblings, parentTitle } = pageContext
  return (
    <Layout>
      <HeroPage title={position.title} context={pageContext} location={location} parentTitle={parentTitle}/>
      { navLinks && <InnerNavigation location={location} innerMenu={navLinks} />} 
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-3">
            <div><Link to="/positions">All positions</Link></div>
          {
              siblings && siblings.map(item => {
                const path = pathToModel('position', item.node.slug);
                return (
                  <div>
                    <Link to={path}>{ item.node.title }</Link>
                  </div>  
                )
              })
            }
          </div>
          <div className="col-lg-9">
            <h1>{position.title}</h1>
            {position.imageHeader && <ImageWrapper image={position.imageHeader} />}
            {position.intro && <div dangerouslySetInnerHTML={{ __html: position.intro }} />}
            {position.text && <StructuredContentDefault content={position.text} />}
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Position;

export const PositionQuery = graphql`
  query PositionById($id: String, $menuInner: String) {
    position: datoCmsPosition(id: { eq: $id }) {
      id
      title
      slug
      intro
      imageHeader {
        url
        alt
        gatsbyImageData
      }
      text {
        value
      }
    }
    navLinks: datoCmsNavigation(id: { eq: $menuInner }) {
      ...Navigation
    }
  }
`;
