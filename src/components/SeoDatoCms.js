import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const SeoDatoCMS = ({ seo, favicon = null, siteTitle = null, children = null }) => {
  return (
    <HelmetDatoCms seo={seo} favicon={favicon?.faviconMetaTags}>
      {children}
    </HelmetDatoCms>
  );
};

export default SeoDatoCMS;
