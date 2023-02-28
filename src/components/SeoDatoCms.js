import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms'

const SeoDatoCMS = ({ page, children }) => {
  const seo = page.seoMetaTags;
  const sitename = 'EGP'
  const titleIndex = seo?.tags?.find((tag) => tag.tagName === 'title');
  const overrideTitle = page.seo?.title ? page.seo.title : titleIndex?.content;
  if (seo.tags) {
    const og_datocms_title = seo.tags?.find((tag) => tag.attributes?.property === 'og:title')
    const og_datocms_sitename = seo.tags?.findIndex((tag) => tag.attributes?.property === 'og:site_name')
    // Override og:title because share same CMS
    seo.tags[og_datocms_sitename].attributes.content = sitename
    // Override Title because share same CMS
    const titleIndex = seo.tags?.findIndex((tag) => tag.tagName === 'title')
    const newTitle = overrideTitle ? overrideTitle : og_datocms_title.attributes.content
    seo.tags[titleIndex].content = `${newTitle} | ${sitename}`
  }

  return <HelmetDatoCms seo={seo}>{children}</HelmetDatoCms>
};
export default SeoDatoCMS;
