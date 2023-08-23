import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const SeoDatoCMS = ({ seo, favicon = null, children = null, DsBgImage = null, MbBgImage = null }) => {
  return (
    <HelmetDatoCms seo={seo} favicon={favicon?.faviconMetaTags}>
      {children}
      DsBgImage ? <link
        rel="preload"
        as="image"
        key="home-main-img"
        href={DsBgImage?.images?.fallback.src}
      /> : null
      MbBgImage ? <link
        rel="preload"
        as="image"
        key="home-main-img"
        href={MbBgImage?.images.fallback.src}
      /> : null
    </HelmetDatoCms>
  );
};

export default SeoDatoCMS;
