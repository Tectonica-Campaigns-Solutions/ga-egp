import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import InnerNavigation from '../../components/Global/InnerNavigation/InnerNavigation';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';

import './index.scss';

const Position = ({ pageContext, location, data: { position, navLinks } }) => {
  const { siblings, parentTitle } = pageContext;
  // normalize siblings
  const normSiblings = siblings.map((item) => item.node);

  const sidebarLinks = () => {
    const updatedSiblings = [{ slug: 'positions', title: 'All positions' }, ...normSiblings];
    return <>{normSiblings && <SidebarNav menu={updatedSiblings} location={location} />}</>;
  };

  return (
    <Layout>
      <HeroPage title={position.title} context={pageContext} location={location} parentTitle={parentTitle} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      <div className="position-detail">
        <InnerLayout sideNav={sidebarLinks()}>
          <h1>{position.title}</h1>

          {position.imageHeader && <ImageWrapper image={position.imageHeader} />}
          {position.intro && <div className="intro" dangerouslySetInnerHTML={{ __html: position.intro }} />}

          {position.text && (
            <div className="content">
              <StructuredContentDefault content={position.text} />
            </div>
          )}
        </InnerLayout>
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
