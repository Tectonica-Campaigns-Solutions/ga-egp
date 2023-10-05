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

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
      <link
        rel="preload"
        href="/fonts/Colby/Colby-StBlk.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="colby"
      />
  ]);
  setPostBodyComponents([
    <link rel="stylesheet" href="/cookies.css" />
  ])
};
