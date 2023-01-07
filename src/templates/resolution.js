import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout'
import StructuredTextDefault from '../components/StructuredTextDefault';

const resolution = ({ data: { resolution }}) => {
  return (
    <Layout>
      <div className="container mt-5 pt-5">
        <div>{ resolution.title}</div>
        {
          resolution.intro && <div dangerouslySetInnerHTML={{__html: resolution.intro}} />
        }
        {
          resolution.text &&  <StructuredTextDefault  content={ resolution.text }/>
        }
        <hr />
        {
          resolution.footnotes.map(item => {
            return (<div id={item.anchorId}>{ item.text }</div>)
          })
        }
      </div>
    </Layout>
  )
}

export default resolution;

export const ResolutionQuery = graphql`
  query ResolutionById($id: String) {
    resolution: datoCmsResolution(id: { eq: $id }) {
      id
      title
      slug
      intro
      text {
        value
      }
      footnotes{
        anchorId
        text
      }
    }
  }
`;