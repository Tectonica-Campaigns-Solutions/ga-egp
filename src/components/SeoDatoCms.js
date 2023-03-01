import React, { useMemo } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const SeoDatoCMS = ({ seo, favicon = null, siteTitle = null }) => {
  const {
    globalSeo: { siteName },
  } = siteTitle;

  console.log({ seo });

  // override if necessary
  seo?.tags.map((seoTag) => {
    if (seoTag.tagName === 'title') {
      seoTag.content = seoTag.content + `- ${siteName}`;
    }
    return seoTag;
  });

  return <HelmetDatoCms seo={seo} favicon={favicon?.faviconMetaTags} />;
};

export default SeoDatoCMS;
