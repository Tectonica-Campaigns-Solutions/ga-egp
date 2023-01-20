import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import { StructuredText } from 'react-datocms';
import { GatsbyImage } from 'gatsby-plugin-image';

const Post = ({ pageContext, location, data: { page }}) => {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} date={ page.date }/>
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {page.image && <div> 
              <GatsbyImage image={page.image.gatsbyImageData} />
              <p>{ page.image.title }</p></div>
            }
            {page.person && <div>Person</div>}

            <StructuredText data={page.textContent }/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const PostQuery = graphql`
  query PostById($id: String) {
    page: datoCmsPost(id: { eq: $id }) {
      id
      title
      slug
      image{
        gatsbyImageData
        alt
        title
      }
      date(formatString: "D MMM Y")
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      
      seo {
        title
        description
      }
      textContent{
        value
      }
    }
  }`

export default Post;
