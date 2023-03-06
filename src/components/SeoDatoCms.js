import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const SeoDatoCMS = ({ seo, favicon = null, siteTitle = null, noIndex = false }) => {
  const {
    globalSeo: { siteName },
  } = siteTitle;

  // override if necessary
  seo?.tags.map((seoTag) => {
    if (seoTag.tagName === 'title') {
      seoTag.content = seoTag.content + `- ${siteName}`;
    }
    return seoTag;
  });

  // Avoid indexation
  if (noIndex) {
    seo.tags.push({
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    });
  }

  return <HelmetDatoCms seo={seo} favicon={favicon?.faviconMetaTags} />;
};

export default SeoDatoCMS;
