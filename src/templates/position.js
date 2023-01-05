import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import StructuredTextDefault from '../components/StructuredTextDefault';
import ImageWrapper from '../components/Global/Image/ImageWrapper';

const Position = ({ data: { position } }) => {
  console.log(position);
  return (
    <Layout>
      <div className="container mt-5 pt-5">
        <div>{ position.title }</div>
        <div dangerouslySetInnerHTML={{__html: position.intro}} />
        {
          position.text &&  <StructuredTextDefault  content={ position.text }/>
        }
        {
          position.imageHeader && <ImageWrapper image={ position.imageHeader} />
        }
       
      </div>
      
    </Layout>
  )
}

export default Position;

export const PositionQuery = graphql`
  query PositionById($id: String) {
    position: datoCmsPosition(id: { eq: $id }) {
      id
      title
      slug
      intro
      imageHeader{
        url
        alt
        gatsbyImageData
      }
      text {
        value
      }
    }
  }
`;