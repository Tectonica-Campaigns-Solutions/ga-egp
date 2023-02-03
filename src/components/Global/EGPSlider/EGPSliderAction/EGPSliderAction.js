import React from 'react';
import './index.scss';

const EGPSliderAction = ({ currentSlide = 0, totalSlides, onChangeSlide, onPrevSlide, onNextSlide }) => {
  return (
    <div className="egp-slider-action">
      <span>
        {currentSlide + 1}/{totalSlides}
      </span>

      <input
        className="range"
        onChange={onChangeSlide}
        value={currentSlide}
        type="range"
        min={0}
        max={totalSlides - 1}
      />

      <div className="buttons">
        <span onClick={onPrevSlide}>←</span>
        <span onClick={onNextSlide}>→</span>
      </div>
    </div>
  );
};

export default EGPSliderAction;
