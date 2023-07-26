import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './index.scss';

function EmbedAudio({ file }) {
  const audioRef = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(true);

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
      <AudioPlayer
        autoPlay
        src={file.url}
        ref={audioRef}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Icon for play/pause */}
      <div className="fixed-action" onClick={handlePlayPauseAudio}>
        {isPlaying ? (
          <svg width="84" height="100" viewBox="0 0 84 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H74C79.5228 0 84 4.47715 84 10V90C84 95.5228 79.5229 100 74 100H0V0Z" fill="#FFEC8F" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M42 75C38.5417 75 35.2917 74.3433 32.25 73.03C29.2083 71.7167 26.5625 69.9358 24.3125 67.6875C22.0625 65.4375 20.2817 62.7917 18.97 59.75C17.6583 56.7083 17.0017 53.4583 17 50C17 46.5417 17.6567 43.2917 18.97 40.25C20.2833 37.2083 22.0642 34.5625 24.3125 32.3125C26.5625 30.0625 29.2083 28.2817 32.25 26.97C35.2917 25.6583 38.5417 25.0017 42 25C45.4583 25 48.7083 25.6567 51.75 26.97C54.7917 28.2833 57.4375 30.0642 59.6875 32.3125C61.9375 34.5625 63.7192 37.2083 65.0325 40.25C66.3458 43.2917 67.0017 46.5417 67 50C67 53.4583 66.3433 56.7083 65.03 59.75C63.7167 62.7917 61.9358 65.4375 59.6875 67.6875C57.4375 69.9375 54.7917 71.7192 51.75 73.0325C48.7083 74.3458 45.4583 75.0017 42 75ZM34 41H40V60H34V41ZM50 41H44V60H50V41Z"
              fill="#184B31"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="100" viewBox="0 0 70 100" fill="none">
            <path d="M0 0H60C65.5229 0 70 4.47715 70 10V90C70 95.5228 65.5229 100 60 100H0V0Z" fill="#FFEC8F" />
            <path
              d="M30 59L44 50L30 41V59ZM35 70C32.2333 70 29.6333 69.4747 27.2 68.424C24.7667 67.3733 22.65 65.9487 20.85 64.15C19.05 62.35 17.6253 60.2333 16.576 57.8C15.5267 55.3667 15.0013 52.7667 15 50C15 47.2333 15.5253 44.6333 16.576 42.2C17.6267 39.7667 19.0513 37.65 20.85 35.85C22.65 34.05 24.7667 32.6253 27.2 31.576C29.6333 30.5267 32.2333 30.0013 35 30C37.7667 30 40.3667 30.5253 42.8 31.576C45.2333 32.6267 47.35 34.0513 49.15 35.85C50.95 37.65 52.3753 39.7667 53.426 42.2C54.4767 44.6333 55.0013 47.2333 55 50C55 52.7667 54.4747 55.3667 53.424 57.8C52.3733 60.2333 50.9487 62.35 49.15 64.15C47.35 65.95 45.2333 67.3753 42.8 68.426C40.3667 69.4767 37.7667 70.0013 35 70Z"
              fill="#184B31"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default EmbedAudio;
