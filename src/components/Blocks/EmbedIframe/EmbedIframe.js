import React from 'react';

function EmbedIframe({ block }) {
  return (
    <div className="container">
      <div className="w100" dangerouslySetInnerHTML={{ __html: block.embedCode }} />
    </div>
  );
}

export default EmbedIframe;
