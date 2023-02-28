import React from 'react';

const SeoDatoCMS = ({ page, children }) => {
  const seo = page.seoMetaTags;

  const sitename = 'European Greens';
  const titleIndex = seo?.tags?.find((tag) => tag.tagName === 'title');
  const overrideTitle = page.seo?.title ? page.seo.title : titleIndex?.content;

  return (
    <>
      {seo?.tags?.map((seoTag) => {
        if (seoTag.tagName === 'title') {
          return <title>{`${overrideTitle} - ${sitename}`}</title>;
        }

        const name = seoTag.attributes?.property || seoTag.attributes?.name;
        let content = seoTag.attributes?.content;

        if (name === 'description') {
          content = page.seo?.description || seoTag.attributes?.content;
        } else if (name === 'og:image') {
          content = page.seo?.image?.url || seoTag.attributes?.content;
        }

        return <meta name={name} content={content} />;
      })}

      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />

      {children}
    </>
  );
};
export default SeoDatoCMS;
