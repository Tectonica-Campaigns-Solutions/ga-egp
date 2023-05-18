import React from 'react';

function EmbedAudio({ src }) {
  return (
    <div>
      <iframe title="iframe" src={src}></iframe>
    </div>
  );
}

export default EmbedAudio;
