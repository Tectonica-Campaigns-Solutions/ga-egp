import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import { StructuredText } from 'react-datocms';
import { GatsbyImage } from 'gatsby-plugin-image';
import Acordion from '../components/Global/Acordion/Acordion';

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
            {
              page.textContent && 
                <StructuredText 
                  data={page.textContent}
                  renderBlock={({ record }) => {
                    switch (record.__typename) {
                      case 'DatoCmsAcordion': 
                        return <Acordion items={record.items} />
                      default:
                        return <></>
                    }
                  }}
                />
            }
            {
              page.tags && page.tags.length > 0 && page.tags.map(item => <div>{ item.title }</div>)
            }
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
        blocks{
          __typename
          id: originalId
          items{
            title
            text
          }
        }
      }
      tags{
        ... on DatoCmsTagNews{
          title
          id
          slug
        }
      }
    }
  }`

export default Post;
