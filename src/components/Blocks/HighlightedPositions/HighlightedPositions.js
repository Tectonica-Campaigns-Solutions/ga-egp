import React from 'react';
import CardPosition from '../../Global/CardPosition/CardPosition';
import { isArray } from '../../../utils';
import EGPSlider from '../../Global/EGPSlider/EGPSlider';

import './index.scss';

function HighlightedPositions({ block }) {
  const { pretitle, title, description, positions } = block;

  const responsiveSettings = [
    {
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
          </div>

          {isArray(positions) && (
            <div className="col-xxl-8 col-slide">
              <div className="row gx-5">
                <EGPSlider responsive={responsiveSettings}>
                  {positions.map((item) => (
                    <CardPosition position={item} />
                  ))}
                </EGPSlider>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HighlightedPositions;
