import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './index.scss';

function EmbedAudio({ file }) {
  const audioRef = React.useRef();

  if (!file?.url) return null;

  const handlePlayPauseAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.audio.current.paused) {
      audioRef.current.audio.current.play();
    } else {
      audioRef.current.audio.current.pause();
    }
  };

  return (
    <div className="embed-audio">
      <AudioPlayer autoPlay src={file.url} ref={audioRef} />

      {/* Fixed icon to play/pause */}
      <div className="fixed-action" onClick={handlePlayPauseAudio}>
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="100" viewBox="0 0 70 100" fill="none">
          <path d="M0 0H60C65.5229 0 70 4.47715 70 10V90C70 95.5228 65.5229 100 60 100H0V0Z" fill="#FFEC8F" />
          <path
            d="M30 59L44 50L30 41V59ZM35 70C32.2333 70 29.6333 69.4747 27.2 68.424C24.7667 67.3733 22.65 65.9487 20.85 64.15C19.05 62.35 17.6253 60.2333 16.576 57.8C15.5267 55.3667 15.0013 52.7667 15 50C15 47.2333 15.5253 44.6333 16.576 42.2C17.6267 39.7667 19.0513 37.65 20.85 35.85C22.65 34.05 24.7667 32.6253 27.2 31.576C29.6333 30.5267 32.2333 30.0013 35 30C37.7667 30 40.3667 30.5253 42.8 31.576C45.2333 32.6267 47.35 34.0513 49.15 35.85C50.95 37.65 52.3753 39.7667 53.426 42.2C54.4767 44.6333 55.0013 47.2333 55 50C55 52.7667 54.4747 55.3667 53.424 57.8C52.3733 60.2333 50.9487 62.35 49.15 64.15C47.35 65.95 45.2333 67.3753 42.8 68.426C40.3667 69.4767 37.7667 70.0013 35 70Z"
            fill="#184B31"
          />
        </svg>
      </div>
    </div>
  );
}

export default EmbedAudio;
