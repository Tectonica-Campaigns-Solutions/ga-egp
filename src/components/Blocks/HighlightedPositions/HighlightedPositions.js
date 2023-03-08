import React from 'react';
import CardPosition from '../../Global/CardPosition/CardPosition';
import { isArray } from '../../../utils';
import EGPSlider from '../../Global/EGPSlider/EGPSlider';
import Button from '../../Global/Button/Button';

import './index.scss';

function HighlightedPositions({ block }) {
  console.log(block)
  const { pretitle, title, description, positions } = block;

  const responsiveSettings = [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <div className="highlighted-positions">
      <div className="container">
        <div className="row">
          <div className="col-xxl-4 col-text">
            <h3>{pretitle}</h3>
            <h2>{title}</h2>
            <div className="description" dangerouslySetInnerHTML={{ __html: description }} />

            <div className="info-btn">
              <Button label={'All positions'} />
            </div>
          </div>

          {isArray(positions) && (
            <div className="col-xxl-8 col-slide">
              <div className="row gx-5">
                <EGPSlider responsive={responsiveSettings}>
                  {positions.map((item, index) => (
                    <CardPosition position={item} key={index} />
                  ))}
                </EGPSlider>
              </div>
            </div>
          )}

          <div className="mobile-info-btn">
            <Button label={'All positions'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightedPositions;
