import React from 'react';
import { isArray } from '../../../utils';
import CtaList from '../../Global/Cta/CtaList';
import ImageWrapper from '../../Global/Image/ImageWrapper';

import * as styles from './narrative-block.module.scss';

export default function NarrativeBlock({ block }) {
  const { pretitle, title, textContent, image, ctas } = block;

  return (
    <div className={styles.componentnarrativeblock}>
      <div className="container pb-5">
        <div className={`row align-items-center`}>
          <div className="col-lg-6">
            <h3>{pretitle}</h3>
            <h2>{title}</h2>

            {textContent && <div className={styles.textcontent} dangerouslySetInnerHTML={{ __html: textContent }} />}

            {isArray(ctas) && (
              <div>
                <CtaList ctas={ctas} />
              </div>
            )}
          </div>

          <div className="col-lg-6">{<ImageWrapper image={image} objectFit="cover" />}</div>
        </div>
      </div>
    </div>
  );
}
