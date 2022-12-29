import React from "react";
import Slider from "react-slick";
import EGPSliderDots from "./EGPDots";

const Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  appendDots: (dots) => <EGPSliderDots dots={dots} />,
  className: "p-5 m-5",
};

const EGPSlider = ({ children }) => <Slider {...Settings}>{children}</Slider>;

export default EGPSlider;
