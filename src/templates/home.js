import React from 'react'
import { graphql } from 'gatsby';
import Blocks from '../componentes/Blocks';
import HeroHome from '../componentes/Global/HeroHome/HeroHome';
 
const Home = ({ data: { page } }) => {
  return (
    <div>
      <HeroHome title={page.title} image={page.backgroundImage.gatsbyImageData} imageMobile={page.imageMobile.gatsbyImageData} description={page.description} form={page.form} textWhite={page.textWhite}/>
      <Blocks blocks={page.blocks} />
    </div>
  )
}

export default Home;

export const HomeQuery = graphql`
  query HomeById{
    page: datoCmsHome{
      title
      description
      textWhite
      backgroundImage{
        url
        gatsbyImageData
      }
      imageMobile{
        url
        gatsbyImageData
      }
      form{
        ... on DatoCmsHubspot{
          id
          formId
          region
          portalId 
        }
      }
      description
      blocks{
        __typename
        ... on DatoCmsNarrativeBlock{
          ... BlockNarrativeBlock
        }
        ...on DatoCmsLogosBlock{
          ... BlockLogos
        }
        ...on DatoCmsTextHubspotForm{
          ... BlockTextHubspot
        }
      }
    }
  }
`;