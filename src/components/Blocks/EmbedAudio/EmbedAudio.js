import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './index.scss';

function EmbedAudio({ file }) {
  if (!file?.url) return null;

  return (
    <div className="embed-audio">
      <AudioPlayer autoPlay src={file.url} onPlay={(e) => console.log('onPlay')} />
    </div>
  );
}

export default EmbedAudio;
