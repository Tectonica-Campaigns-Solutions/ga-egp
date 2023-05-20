import React, { useCallback, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import Button from '../../components/Global/Button/Button';
import SeoDatoCms from '../../components/SeoDatoCms';
import { isArray } from '../../utils';
import Blocks from '../../components/Blocks';
import Link from '../../components/Global/Link';
import SessionDetail from './session-detail';

import * as styles from './congress.module.scss';

function Congress({ location, data: { congress, favicon, siteTitle } }) {
  const [showPlenary, setShowPlenary] = useState(null);
  const { slug, title, label, introduction, backgroundColor, backgroundImage, ctas = [], pages, seo } = congress;

  const sidebarLinks = () => {
    const items = pages;
    return <>{items && <SidebarNav menu={items} location={location} landing={{title:label !== '' ? label : 'Start', slug}}/>}</>;
  };

  useEffect(() => {
    setShowPlenary(null);
    const params = new URLSearchParams(window.location.search);

    if (params.has('item')) {
      const maybeListSessionBlock = congress.blocks.find((b) => b.__typename === 'DatoCmsListSession');

      if (maybeListSessionBlock) {
        let existSession = null;

        const sessionItems = maybeListSessionBlock.sessionItems;
        const paramId = params.get('item').replace('DatoCmsSession-', '');

        for (const item of sessionItems) {
          const sessionItem = item.session.find((s) => s.id.replace('DatoCmsSession-', '') === paramId);

          if (sessionItem) {
            existSession = sessionItem;
            break;
          }
        }

        console.log({ existSession });
        setShowPlenary(existSession);
      }
    }
  });

  return (
    <Layout navbarWhite>
      <SeoDatoCms seo={seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroCongress
        title={title}
        introduction={introduction}
        ctas={ctas}
        bgImage={backgroundImage}
        bgColor={backgroundColor}
        mainPage={true}
        isCongress={congress.isCongress}
      />

      <div className={styles.congressDetail}>
        <InnerLayout sideNav={sidebarLinks()}>
          {isArray(congress.blocks) && !showPlenary && <Blocks blocks={congress.blocks} />}

          {showPlenary && <SessionDetail session={showPlenary} />}

          {/* <div className={styles.topContent}>
            <span>Start</span>
            <h1>{congress.title}</h1>

            <p className={styles.date}>Friday, 2 December, 2022 - 13:00 to Sunday, 4 December, 2022 - 14:30</p>

            <Button label={'REGISTER'} />
          </div> */}

          {/* <div className={styles.content}>
            <p>
              We are delighted to invite you to join us in Copenhagen, Denmark on 2–4 December 2022 for the 6th European
              Green Party Congress. Every five years, our Congress gathers over 1000 Green representatives, from
              ministers to grassroots activists in our member parties. This Congress is an opportunity to reaffirm our
              shared values and set the tone and strategic direction for the 2024 European Elections campaign. Never
              have the Greens received the trust of citizens in so many local offices, regional parliaments and national
              governments, leading the crucial transformation towards a fair and sustainable future. We show in all the
              political layers our strong drive and values to change the future for the better, while demonstrating the
              willingness to find credible responses to the crises we are living. Putin’s invasion of Ukraine has
              changed Europe. It has rocked the global security architecture, gave a new momentum to the accession
              process of several countries, and ignited a new boost towards energy independence. Now, Ukrainian flags
              are raised in every country. But Putin’s weaponisation of energy and food is having a devastating impact
              in Europe and abroad and could endanger European unity. We will be facing enormous challenges in autumn,
              from energy security to inflation and food security, to name a few. At the same time, we must continue to
              fight for climate justice as climate catastrophes increase in frequency and intensity. This congress will
              be a decisive political and strategic moment to bring together Green Parties, activists and decision
              makers working on and putting into practice our Green answers to difficult and complex questions, such as:
              How can we continue to push for an energy transition while mitigating energy poverty in Europe? How can we
              enhance Europe’s unity in support of Ukraine and standing up to Putin’s threat? And how can we maintain
              solidarity as we face the triple crises of pandemic, war and climate? We will also start laying the
              groundwork for the upcoming 2024 European elections. We will shape our shared vision for the future of the
              European Union, which has played a central role in weathering recent shocks but must ramp up efforts on
              the fight against climate change, the just transition and enhancing democracy. We look forward to sharing
              more information with you about the 6th European Green Party Congress and the 36th European Green Party
              Council in the coming weeks. We encourage all Green party members and delegates to save the date, book
              their travels, and join us on 2–4 December 2022.
            </p>
          </div> */}
        </InnerLayout>
      </div>
    </Layout>
  );
}

export const CongressQuery = graphql`
  query CongressById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    congress: datoCmsCongress(id: { eq: $id }) {
      slug
      title
      label
      introduction
      backgroundColor
      backgroundImage {
        url
        gatsbyImageData
      }
      backgroundImageForInnerPages {
        url
        gatsbyImageData
      }
      ctas {
        ...BlockCta
      }
      date
      isCongress
      pages {
        ... on DatoCmsCongressInnerPage {
          title
          slug
          id
          model {
            apiKey
          }
        }
      }
      blocks {
        ...BlockTextSimple
        ...BlockListSessions
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;

export default Congress;
