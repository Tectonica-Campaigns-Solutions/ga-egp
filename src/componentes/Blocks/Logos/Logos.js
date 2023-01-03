import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { isArray } from '../../../utils';
import Slider from "react-slick";

import './index.scss';

function Logos({ block }) {
  const { title=null, intro=null, logos, ctas=null } = block;
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <div className={`logos-block`}>
      <div className="container">
        {title && <h2>{title}</h2>}

        {intro && <div className="intro" dangerouslySetInnerHTML={{ __html: intro }} />}

        {isArray(logos) && (
          <div className="row logos-list justify-content-center g-5">
            <Slider {...settings}>
            {logos.map(logo => (
              <div className="col-lg-2 col-md-3 col-6">
                <a href={logo.url} target="_blank">
                  <ImageWrapper image={logo.icon} />
                </a>
              </div>
            ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logos;
