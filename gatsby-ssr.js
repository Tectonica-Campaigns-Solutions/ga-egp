import React from "react"


export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <>
      <link
        rel="preload"
        href="/fonts/Colby/Colby-StBlk.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="colby"
      />
      <link rel="preload" as="image" href="https://www.datocms-assets.com/87481/1674746081-45436302494_20c278316b_o-2.png?auto=format&w=2400" />
    </>
  ])
}