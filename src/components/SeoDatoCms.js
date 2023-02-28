import React from 'react';

const SeoDatoCMS = ({ page, children }) => {
  console.log(page)
  const seo = page.seoMetaTags;

  const sitename = 'European Greens';
  const titleIndex = seo?.tags?.find((tag) => tag.tagName === 'title');
  const overrideTitle = page.seo?.title ? page.seo.title : titleIndex?.content;

  // seo?.tags.map((item) => {
  //   if (item.tagName === 'title') {
  //     return (item.content = `${overrideTitle} - ${sitename}`);
  //   }
  // });

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
        }

        return <meta name={name} content={content} />;
      })}

      {/* <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} /> */}

      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />

      {children}
    </>
  );
};
export default SeoDatoCMS;
