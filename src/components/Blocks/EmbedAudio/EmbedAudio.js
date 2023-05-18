import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './index.scss';

function EmbedAudio({ file, iframeContent = '' }) {
  console.log({ file });

  return (
    <div className="embed-audio">
      {/* <iframe title="iframe" src={iframeContent}></iframe> */}

      <AudioPlayer
        autoPlay
        src={file.url}
        onPlay={(e) => console.log('onPlay')}
        // other props here
      />
    </div>
  );
}

export default EmbedAudio;
