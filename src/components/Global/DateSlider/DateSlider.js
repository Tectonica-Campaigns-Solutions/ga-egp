import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import yearLeftIcon from '../../Icons/year-left.svg';
import yearRightIcon from '../../Icons/year-right.svg';

import 'swiper/css';
import './index.scss';

const prevButton = (
  <div className="swiper-button-prev">
    <img src={yearLeftIcon} alt="Left icon" />
  </div>
);

const nextButton = (
  <div className="swiper-button-next">
    <img src={yearRightIcon} alt="Right icon" />
  </div>
);

const DateSlider = ({ years, activeYear }) => {
  const initialSlide = years.findIndex((y) => y === activeYear);

  return (
    <div className="date-slider">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        // centeredSlides={true}
        modules={[Navigation]}
        navigation={{ prevEl: prevButton, nextEl: nextButton }}
        initialSlide={initialSlide}
      >
        {years.map((year) => (
          <SwiperSlide>
            <div key={year}>
              <input type="radio" id={year} name="selected_year" value={year} />
              <label className={`${activeYear === year ? 'active' : ''}`} for={year}>
                {year}
              </label>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DateSlider;
