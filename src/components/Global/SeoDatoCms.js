import React from 'react';

const SeoDatoCms = ({ page }) => {
  const seo = page.seoMetaTags;
  const sitename = 'European Greens';
  const titleIndex = seo?.tags?.find(tag => tag.tagName === 'title');
  const overrideTitle = page.seo?.title ? page.seo.title : titleIndex?.content;

  seo?.tags.map(item => {
    if (item.tagName === 'title') {
      item.content = `${overrideTitle} - ${sitename}`;
    }
  });

  return (
    <>
      <title>{overrideTitle}</title>
    </>
  )  
};
export default SeoDatoCms;
