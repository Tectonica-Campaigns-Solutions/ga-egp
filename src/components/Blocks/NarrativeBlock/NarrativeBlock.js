import React from 'react';
import { isArray } from '../../../utils';
import CtaList from '../../Global/Cta/CtaList';
import ImageWrapper from '../../Global/Image/ImageWrapper';

import * as styles from './narrative-block.module.scss';

export default function NarrativeBlock({ block }) {
  const { pretitle, title, textContent, image, imageAlignment = 'right', backgroundColor = '', ctas } = block;

  return (
    <div className={`${styles.componentnarrativeblock} narrative ${backgroundColor}`}>
      <div className="container pb-lg-5">
        <div className={`row align-items-center ${imageAlignment === 'left' ? 'flex-row-reverse' : ''}`}>
          <div className="col-lg-6">
            <h3>{pretitle}</h3>
            <h2>{title}</h2>

            {textContent && (
              <div
                className={`${styles.textcontent} link-and-list-styles`}
                dangerouslySetInnerHTML={{ __html: textContent }}
              />
            )}

            {isArray(ctas) && (
              <div>
                <CtaList ctas={ctas} />
              </div>
            )}
          </div>

          <div className={`col-lg-6 ${styles.image}`}>{<ImageWrapper image={image} objectFit="cover" />}</div>
        </div>
      </div>
    </div>
  );
}
