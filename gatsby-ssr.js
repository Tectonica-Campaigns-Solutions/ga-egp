import React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';

// export const onRenderBody = ({ getHeadComponents, replaceHeadComponents }) => {
//   const homepageData = useStaticQuery(graphql`
//     query {
//       datoCmsHome {
//         backgroundImage {
//           url
//         }
//         imageMobile {
//           url
//         }
//       }
//     }
//   `);

//   const imageUrls = [homepageData.datoCmsHome.backgroundImage.url, homepageData.datoCmsHome.imageMobile.url];
//   const imagePreloads = imageUrls.map((url) => <link rel="preload" href={url} as="image" key={url} />);

//   const headComponents = getHeadComponents();
//   replaceHeadComponents([...headComponents, ...imagePreloads]);
// };

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Colby/Colby-StBlk.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="colby"
    />,
    <link
      rel="preload"
      as="image"
      key="home-main-img"
      href="https://www.datocms-assets.com/87481/1674746081-45436302494_20c278316b_o-2.png?auto=format&w=2400"
    />,
  ]);
};
