import React from 'react';
import Slider from 'react-slick';
import yearLeftIcon from '../../Icons/year-left.svg';
import yearRightIcon from '../../Icons/year-right.svg';

import './index.scss';

const DateSlider = ({ years, activeYear }) => {
  const initialSlide = years.findIndex((y) => y === activeYear);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    initialSlide,
    nextArrow: <img src={yearRightIcon} alt="Year right arrow icon" />,
    prevArrow: <img src={yearLeftIcon} alt="Year left arrow icon" />,
  };

  return (
    <div className="date-slider">
      <Slider {...settings}>
        {years.map((year) => (
          <div className="" key={year}>
            <input type="radio" id={year} name="selected_year" value={year} />
            <label className={`${activeYear === year ? 'active' : ''}`} for={year}>
              {year}
            </label>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DateSlider;
