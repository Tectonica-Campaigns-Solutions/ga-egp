import * as React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/src/assets/fonts/Colby/Colby_Black.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="colbyBlackFont"
    />,
    <link
      rel="preload"
      href="/src/assets/fonts/Colby/Colby_Black_Italic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="colbyBlackItalicFont"
    />,
    <link
      rel="preload"
      href="/src/assets/fonts/Colby/Colby_Bold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="colbyBoldFont"
    />,
    <link
      rel="preload"
      href="/src/assets/fonts/Colby/Colby_Bold_Italic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="colbyBoldItalicFont"
    />,
  ]);
};
