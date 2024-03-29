import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import EGPSlider from '../../Global/EGPSlider/EGPSlider';
import { isArray } from '../../../utils';
import Link from '../../Global/Link';

import * as styles from './logos.module.scss';

function Logos({ block }) {
  const { title = null, intro = null, logos } = block;

  return (
    <div className={styles.logosblock}>
      <div className="container">
        {title && <h2>{title}</h2>}
        {intro && (
          <div className={`${styles.intro} link-and-list-styles`} dangerouslySetInnerHTML={{ __html: intro }} />
        )}

        {isArray(logos) && (
          <div className={`row block-logos-slider ${styles.logoslist} justify-content-center g-5`}>
            <EGPSlider
              autoplay
              renderActions={false}
              slidesToShow={6}
              slidesToScroll={6}
              responsive={[
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
              ]}
            >
              {logos.map((logo, index) => (
                <div className="col-lg-2 col-md-3 col-4" key={index}>
                  {logo.url ? (
                    <Link to={logo.url} target="_blank">
                      <ImageWrapper image={logo.icon} />
                    </Link>
                  ) : (
                    <ImageWrapper image={logo.icon} />
                  )}
                </div>
              ))}
            </EGPSlider>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logos;
