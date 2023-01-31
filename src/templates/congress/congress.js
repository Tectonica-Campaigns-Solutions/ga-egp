import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import Link from '../../components/Global/Link';

function Congress({ data: { congress } }) {
  return (
    <Layout>
      <HeroCongress title={congress.title} mainPage={true}/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            {
              congress.pages && congress.pages.map(item => {
                return (
                  <div>
                    <Link to={item.slug}>{ item.title }</Link>
                  </div>  
                )
              })
            }
          </div>
          <div className="col-lg-9">
            <h1>{ congress.title }</h1>
          </div>
        </div>

       
      </div>
        
    </Layout>
  )
}

export const CongressQuery = graphql`
  query CongressById($id: String) {
    congress: datoCmsCongress(id: { eq: $id }) {
      title
      pages{
        ... on DatoCmsCongressInnerPage{
          title
          slug
          id
        }
      }
    }
  }
`;

export default Congress