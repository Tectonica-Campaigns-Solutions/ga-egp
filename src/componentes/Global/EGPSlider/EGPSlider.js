import React, { useRef, useState } from "react";
import Slider from "react-slick";
import EGPSliderAction from "./EGPSliderAction/EGPSliderAction";

const EGPSlider = ({ children }) => {
  const sliderRef = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleOnChangeSlide = (event) => {
    sliderRef.current?.slickGoTo(event.target.value);
  };

  const Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    beforeChange: (_, next) => setSlideIndex(next),
  };

  return (
    <div>
      <Slider ref={sliderRef} {...Settings}>
        {children}
      </Slider>

      <EGPSliderAction
        currentSlide={slideIndex}
        totalSlides={children.length}
        onChangeSlide={handleOnChangeSlide}
        onPrevSlide={() => sliderRef.current?.slickPrev()}
        onNextSlide={() => sliderRef.current?.slickNext()}
      />
    </div>
  );
};

export default EGPSlider;
