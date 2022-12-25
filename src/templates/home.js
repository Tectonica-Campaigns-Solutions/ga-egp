import React from 'react'
import { graphql } from 'gatsby';
 
const Home = ({ data: { page} }) => {
  return (
    <div>
      <div className="container">
        <h1>{ page.title }</h1>
      </div>
    </div>
  )
}

export default Home;

export const HomeQuery = graphql`
  query HomeById{
    page: datoCmsHome{
      title
    }
  }
`;