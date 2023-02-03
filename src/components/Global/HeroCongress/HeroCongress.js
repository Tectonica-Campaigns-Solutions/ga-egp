import React from 'react';
import Button from '../Button/Button';
import Link from '../Link';
import leftArrow from '../../Icons/left-arrow-white.svg';

import * as styles from './herocongress.module.scss';

function HeroCongress({ title, mainPage = false }) {
  return (
    <div className={styles.heroCongress}>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-5">
            <Link className={styles.backBtn} to={'/events'}>
              <img src={leftArrow} alt="Left arrow icon" />
              All events
            </Link>

            {mainPage ? <h1>{title}</h1> : <h2>{title}</h2>}

            <p>
              We are delighted to invite you to join us in Copenhagen, Denmark on 2-4 December 2022 for the 6th European
              Green Party Congress.
            </p>

            <div className={styles.actionsContainer}>
              <Button label={'REGISTER NOW'} />
              <Button label={'PROGRAMME'} customVariant="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCongress;
