import * as React from 'react';
import Blocks from '../../Blocks';

import * as styles from './style.module.scss';

const TwoColumns = ({ block }) => {
  const { backgroundColor, leftColumnTitle = '', leftContent = [], rightColumnTitle = '', rightContent = [] } = block;

  return (
    <section className={`${styles.twoColumns} color-${backgroundColor}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {leftColumnTitle && <h3>{leftColumnTitle}</h3>}
            <Blocks blocks={leftContent} />
          </div>

          <div className="col-lg-6">
            {rightColumnTitle && <h3>{rightColumnTitle}</h3>}
            <Blocks blocks={rightContent} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumns;
