import React from 'react';
import Link from '../Link';
import leftArrow from '../../Icons/left-arrow-white.svg';
import { isArray } from '../../../utils';
import CtaList from '../Cta/CtaList';
import ImageWrapper from '../Image/ImageWrapper';

import * as styles from './herocongress.module.scss';

function HeroCongress({ title, introduction, bgColor = '', bgImage, ctas = [], mainPage = false, isCongress = false }) {
  return (
    <div
      className={`${styles.heroCongress} ${!mainPage ? styles.secondaryPage : null} primary-${bgColor}`}
      style={{ backgroundImage: `url(${bgImage?.url})` }}
    >
      {/* {bgImage && (
        <div className={styles.heroBgImage}>
          <ImageWrapper image={bgImage} />
        </div>
      )} */}

      <div className="container">
        <div className="row">
          <div className={`${mainPage ? 'col-lg-5' : 'colg-lg-8'}`}>
            {isCongress && (
              <Link className={styles.backBtn} to={'/events'}>
                <img src={leftArrow} alt="Left arrow icon" />
                All events
              </Link>
            )}
            {mainPage ? <h1>{title}</h1> : <h2>{title}</h2>}
            {mainPage && introduction && <p>{introduction}</p>}

            {isArray(ctas) && (
              <div className={styles.actionsContainer}>
                <CtaList ctas={ctas} whiteVariant />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCongress;
