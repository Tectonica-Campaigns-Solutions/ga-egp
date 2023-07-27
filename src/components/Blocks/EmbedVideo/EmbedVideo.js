import React from 'react';
import './index.scss';

function EmbedVideo({ block }) {
  return (
    <div className="container embed-video">
      <iframe
        src={`//www.youtube.com/embed/${block.video.providerUid}?rel=0`}
        frameborder="0"
        allowfullscreen
        className="w-100 video"
      ></iframe>
    </div>
  );
}

export default EmbedVideo;
