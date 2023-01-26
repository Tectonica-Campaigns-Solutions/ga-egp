import React from 'react'
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage'
import Layout from '../../components/Layout/Layout'
import { GatsbyImage } from 'gatsby-plugin-image';
import BackButton from '../../components/Global/BackButton/BackButton';

function person({ pageContext, location, data: {person } }) {
  return (
    <Layout>
      <HeroPage title={person.title} context={pageContext} location={location}/>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 justify-content-end">
            <BackButton location={location} />
          </div>
        </div>
        <div className="row justify-content-center pt-5">
          <div className="col-lg-9">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                { person.image && <GatsbyImage image={person.image.gatsbyImageData}/>}
              </div>
              <div className="col-lg-6">
                <h1>{ person.name }</h1>
                <div className="position">
                  { person.jobPosition }
                </div>
                <div className="social">
                  { person.socialLinks && person.socialLinks.length > 0 &&
                      person.socialLinks.map(item => <div className={`icon ${item.socialNetwork}`}>{ item.url }</div>)
                  }
                </div>
                <div className="phone">
                  { person.phone }
                </div>
                {
                  person.description && <div
                    dangerouslySetInnerHTML={{__html: person.description}}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const PersonQuery = graphql`
  query PersonById($id: String) {
    person: datoCmsPerson(id: { eq: $id }) {
      name
      phone
      email
      jobPosition
      socialLinks{
        url
        socialNetwork
      }
      description
      image{
        gatsbyImageData
      }
    }
  }`

export default person