import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout'
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import Link from '../../components/Global/Link';

function CongressInner({ pageContext, data: { congressInner } }) {
  const { congressTitle, congressSlug, congressMenu } = pageContext
  return (
    <Layout>
      <HeroCongress title={congressTitle}/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            {
              congressMenu.map(item => {
                return (
                  <div>
                    <Link to={`/events/${congressSlug}/${item.slug}`}>{ item.title }</Link>
                  </div>
                )
              })
            }
          </div>
          <div className="col-lg-9">
            <h1>{ congressInner.title }</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const CongressInnerQuery = graphql`
  query CongressInnerById($id: String) {
    congressInner: datoCmsCongressInnerPage(id: { eq: $id }) {
      title
    }
  }
`;

export default CongressInner