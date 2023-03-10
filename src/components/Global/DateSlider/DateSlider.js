import React, { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import yearLeftIcon from '../../Icons/year-left.svg';
import yearRightIcon from '../../Icons/year-right.svg';

import 'swiper/css';
import 'swiper/css/navigation';

import './index.scss';

const DateSlider = ({ years, activeYear }) => {
  const initialSlide = years.findIndex((y) => y === activeYear);

  return (
    <div className="date-slider">
      <div className="swiper-button-prev">
        <img src={yearLeftIcon} alt="Left icon" />
      </div>

      <Swiper
        slidesPerView={3}
        initialSlide={initialSlide}
        modules={[Navigation]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
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

      <div className="swiper-button-next">
        <img src={yearRightIcon} alt="Right icon" />
      </div>
    </div>
  );
};

export default DateSlider;
